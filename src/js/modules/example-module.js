// our module goes here...

const bootflow = (function () {
  let name = "Bootflow Example Module";
  let version = "0.0.1";

  let run = ($) => {
    $(function () {
      console.log("Name: ", name, "\nVersion: ", version);
    });
  };

  return { run };
})();

export default bootflow;
