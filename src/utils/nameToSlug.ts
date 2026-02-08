const nameToSlug = (name: string): string => {
  return name
    .split(" ")
    .map((x) => x.toLowerCase())
    .join("-");
};

export default nameToSlug;
