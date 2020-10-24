const messages = [
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left', 'left',
  'left'
]; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  console.log(messages);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  let removed = messages.shift();
  console.log(removed);
  return removed;
};