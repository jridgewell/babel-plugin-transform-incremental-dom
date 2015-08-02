export default function partitionDeclarators(declarators) {
  return declarators.reduce((paramsAndArgs, declarator) => {
    paramsAndArgs.params.push(declarator.id);
    paramsAndArgs.args.push(declarator.init);

    return paramsAndArgs;
  }, {params: [], args: []});
}
