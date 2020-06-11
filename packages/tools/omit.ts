/**
 * @description - omit specific keys of object
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

//
function omit(
  obj: Record<string, any> = {},
  keys: string[] = []
): Omit<typeof obj, typeof keys[number]> {
  const shallow = { ...obj };

  keys.forEach((key) => {
    Reflect.deleteProperty(shallow, key);
  });

  return shallow;
}

export default omit;
