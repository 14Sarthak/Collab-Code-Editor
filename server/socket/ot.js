function transformInsert(op1, op2) {
  if (op1.position <= op2.position) return op2
  return { ...op2, position: op2.position + op1.text.length }
}

function transformDelete(op1, op2) {
  if (op1.position < op2.position) {
    return { ...op2, position: Math.max(op2.position - op1.length, op1.position) }
  }
  return op2
}

function applyOp(content, op) {
  if (op.type === 'insert') {
    return content.slice(0, op.position) + op.text + content.slice(op.position)
  }
  if (op.type === 'delete') {
    return content.slice(0, op.position) + content.slice(op.position + op.length)
  }
  return content
}

function transform(op1, op2) {
  if (op1.type === 'insert' && op2.type === 'insert') return transformInsert(op1, op2)
  if (op1.type === 'delete' && op2.type === 'insert') return { ...op2, position: op2.position <= op1.position ? op2.position : Math.max(op2.position - op1.length, op1.position) }
  if (op1.type === 'insert' && op2.type === 'delete') return { ...op2, position: op2.position < op1.position ? op2.position : op2.position + op1.text.length }
  if (op1.type === 'delete' && op2.type === 'delete') return transformDelete(op1, op2)
  return op2
}

module.exports = { applyOp, transform }