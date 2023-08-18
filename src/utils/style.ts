// 类名添加前缀
export const mixinClassPrefix = (classPrefix: string, separator = '-') => {
  return (className: string) => {
    return `${classPrefix}${separator}${className}`;
  };
};
