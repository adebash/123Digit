const options = document.querySelectorAll('input[name="level"]');
const nameForm = document.getElementById('nameForm');

options.forEach(option => {
  option.addEventListener('click', () => {
    nameForm.action = option.value;

    console.log(nameForm.action);
  });
});

const levelOptions = document.querySelectorAll('.option');

levelOptions.forEach(levelOption => {
  levelOption.addEventListener('click', () => {
    levelOptions.forEach(levelOpt => levelOpt.removeAttribute('id'));
    levelOption.setAttribute('id', 'active');
  })
  console.log(options)
})