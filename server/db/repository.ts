import {Model, WhereOptions, CreateOptions, FindOptions, UpdateOptions} from 'sequelize';

/**
 * Interface for domain objects that can be persisted to the database.
 */
export interface IPersistable<TData> {
  /**
   * Get the data to store into the database.
   * @returns {TData} A JSON object containing the data to be stored into the database.
   */
  getData(): TData;
}

/**
 * Function that maps from database model to domain model for a given type stored in
 * the database. This will be used on reads to transform the raw fields from the database
 * into a first class JS class upon return. Takes two type parameters:
 * {TData} - The raw data model from the database (i.e. columns)
 * {TClass} - The class to transform into.
 */
export type MappingFunction<TData, TClass> = (attr: TData) => TClass;

/**
 * Abstract base class for repositories. This class should never be instantiated on its own.
 * For each type of domain object, there should be a repository that wraps up the queries
 * needed to perform CRUD operations on that type.
 * @abstract
 * @typedef TClass The domain object to return on read/write calls
 * @typedef TData The database schema definition (i.e. attributes) of the underlying data model.
 * TODO: Should we convert this pattern to use composition instead of inheritance?
 */
export abstract class Repository<TClass, TData> {
  private mapFunc: MappingFunction<TData, TClass>;
  private model: Model<TData, TData>;

  /**
   * Create a new repository with the passed Sequelize model and mapping function.
   * The model should be a reference to the Sequelize schema for the model type to be
   * retrieved and the mapping function should be the {MappingFunction<TData, TClass>}
   * that will be used to map from database to domain object.
   * @param model The schema that this repository should use.
   * @param mapFunc The mapping function to map from database to domain concept
   */
  constructor(model: Model<TData, TData>, mapFunc: MappingFunction<TData, TClass>) {
    this.model = model;
    this.mapFunc = mapFunc;
  }

  /**
   * Create a new entry in the database.
   * @param instance The domain object to create.
   * @param options [Optional] Options for creating the entry such as foreign key includes, etc.
   * @returns {Promise<U>|Promise<TResult>} A promise that will be resolved with the created entry OR rejected
   * with an error if the creation fails.
   */
  async create(instance: IPersistable<TData>, options?: CreateOptions): Promise<TClass> {
    let row: any = await this.model.create(instance.getData(), options);
    let rawData: TData = row.get({ plain: true });
    return this.mapFunc(rawData);
  }

  /**
   * Creates multiple entries in the database.
   * NOTE: This will internally fire off multiple create operations that will each be evaluated asynchronously
   * and are not guaranteed to complete as a single transaction. If the promise is rejected, it is not guaranteed
   * that the entire batch failed (i.e. one or more of the create operations may have succeeded).
   * @param instances An array of domain objects to create.
   * @param options [Optional] Options for creating the entries such as foreign key includes, etc.
   * @returns {Promise<T[]>|Promise<R[]>} A promise that will be resolved with ALL the created entries or rejected
   * with an error if any of the create operations fail.
   */
  async createAll(instances: IPersistable<TData>[], options?: CreateOptions): Promise<TClass[]> {
    let results = await Promise.all<TClass>(instances.map(inst => this.create(inst, options)));
    return results;
  }

  /**
   * Find a single entry by its primary key or return null if no entry exists with that primary key.
   * @param id The primary key (id) to look up.
   * @returns {Promise<U>|Promise<TResult>} A promise that will be resolved with the found value if one exists,
   * resolved with null if one does not exist, or rejected with an error if an error occurs.
   */
  async findById(id: string|number, options?: FindOptions): Promise<TClass> {
    let row: any = await this.model.findById(id, options);
    if (!row) {
      return null;
    }

    let raw = row.get({ plain: true });
    return this.mapFunc(raw);
  }

  /**
   * Checks for the existence of an entry with the passed criteria.
   * @param criteria Criteria (i.e. where clause) to check existence for.
   * @returns {Promise<boolean>} A promise that will be resolved with true if a value exists matching the criteria,
   * resolved with false if no value exists matching the criteria, or rejected with an error if an error occurs.
   */
  async exists(criteria: WhereOptions): Promise<boolean> {
    let count = await this.model.count({ where: criteria });
    return count > 0;
  }

  /**
   * Finds all entries in the repository optionally filtered by the passed criteria (i.e. where clause).
   * @param options Options for filtering or joining the result set.
   * @returns {Promise<U[]>} A promise that will be resolved with an array of matching items (possibly empty) or
   * rejected with an error if one occurs.
   */
  async findAll(options: FindOptions = {}): Promise<TClass[]> {
    let results = await this.model.findAll(options);
    return results.map((row: any) => this.mapFunc(row.get({ plain: true })));
  }

  /**
   * Update all records in database that match the UpdateOptions conditions.
   * @param instance of domain object to update.
   * @param options UpdateOptions to filter records to be updated.
   * @returns {Promise<number>} A promise that will be resolved to the number of rows updated.
   */
  async update(instance: IPersistable<TData>, options: UpdateOptions): Promise<number> {
    let row = await this.model.update(instance.getData(), options);
    return row[0];
  }
}
