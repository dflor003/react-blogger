export const asInt = (envVarName: string, defaultValue: number): number => {
  const intValue = parseInt(process.env[envVarName], 10);
  return isNaN(intValue) ? defaultValue : intValue;
};

export const asString = (envVarName: string, defaultValue: string): string => process.env[envVarName] || defaultValue;

export const asBool = (envVarName: string, defaultValue: boolean): boolean => {
  const value = (process.env[envVarName] || '').toLowerCase();
  switch (value) {
    case 'true' :
      return true;
    case 'false' :
      return false;
    default:
      return defaultValue;
  }
};
