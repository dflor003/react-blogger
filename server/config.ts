const asInt = (envVarName: string, defaultValue: number): number => {
  const intValue = parseInt(process.env[envVarName], 10);
  return isNaN(intValue) ? defaultValue : intValue;
};

const asString = (envVarName: string, defaultValue: string): string => process.env[envVarName] || defaultValue;

const asBool = (envVarName: string, defaultValue: boolean): boolean => {
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

export default {
  debug: asBool('DEBUG', true),
  port: asInt('PORT', 3001)
};
