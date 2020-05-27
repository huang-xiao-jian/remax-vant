export default function addClass(
  baseClassName: string | void,
  extraClassNames: string[]
) {
  return (baseClassName
    ? Array.from(new Set(baseClassName.split(' ').concat(extraClassNames)))
    : extraClassNames
  ).join(' ');
}
