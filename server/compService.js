const Comp  = require('./comp');

async function getComps(data) {
  const comps = await Comp.findAll();
  return comps;
}

async function createComp(args) {
  console.log(args)
  const result = await Comp.create(args.compInput)
  console.log('result', result.dataValues);
  return result.dataValues;
}

async function updateComp(args) {
  console.log(args);
  const {id, ...data} = args;
  const comp = await Comp.update(data, {where: { id: id }});
  console.log('result', comp.dataValues);
  return comp.dataValues;
}

async function deleteComp({id}) {
  const comp = await Comp.destroy({where: {id: id}});
  console.log(comp)
  return {id : comp.id};
}

module.exports = {
  getComps,
  createComp,
  updateComp,
  deleteComp
};
