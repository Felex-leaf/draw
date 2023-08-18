export interface TEMPLATE {
  template: number[][];
  elements?: number;
}

export const calculateTemplateElements = (templates: TEMPLATE[]): TEMPLATE[] => {
  return templates.map(({ template, ...other }) => {
    return {
      ...other,
      template,
      elements: template.reduce((pre, item) => {
        item.forEach((it) => {
          if (it) pre += 1;
        });
        return pre;
      }, 0),
    };
  });
};

export const calculateTemplateElementsTotal = (templates: {
  template: number[][];
}[]) => {
  return calculateTemplateElements(templates).reduce((pre, { elements }) => pre + elements, 0);
};

export const elementsMergeTemplate = (elements: number[], template: number[][]) => {
  let index = 0;
  const res = template.map((item) => {
    return item.map((it) => {
      if (it) {
        const v = elements[index];
        index += 1;
        return v;
      }
      return it;
    });
  });
  elements.splice(0, index);
  return res;
};
