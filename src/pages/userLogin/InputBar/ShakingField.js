const ShakingField = (id) => {
    let inputGroup = document.getElementById(id);
    if (inputGroup) {
      inputGroup.classList.add('LoginShaking');
      setTimeout(() => {
        inputGroup.classList.remove('LoginShaking');
      }, 1000);
    }
  }
  
  export default ShakingField;
  