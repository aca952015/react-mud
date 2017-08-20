'use strict';

export default function skillAndTargetsProcessor(command, args, props) {
  const skills = Object.keys(props.skills);

  // Check for skills with spaces in the name and targets. Examples:
  // "searing light bat" as input should return "searing light" as a skill and "bat" as args.
  // "searing bat" should also return "searing light" as a skill and "bat" as args.
  // "searing light" should return "searing light" as a skill and "undefined" as args.
  // "slash bat" should return "slash" as a skill and "bat" as args.
  // "slash" should return "slash" as a skill and "undefined" as args.
  if (args) {
    const regEx = new RegExp(`^${command} ${args.split(' ')[0]}`, 'i');
    const targetedSkill = skills.find(skill => skill.match(regEx));
    if (targetedSkill) {
      if (args.split(' ').length > 1) return {targetedSkill, args: args.split(' ')[1]};
      return {targetedSkill, args: undefined};
    }
  }

  const regEx = new RegExp(`^${command}`, 'i');
  const targetedSkill = skills.find(skill => skill.match(regEx));
  return {targetedSkill, args};
}
