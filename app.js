// Variables
let users; // List of Users | Array
let user; // Logged in user | JSON Object

// Initialize all variables and elements
initialization();

function initialization() {
  users = [];
  user = {};

  // Bindings
  $(`#btnMCreate`).click(function () {
    registerUser();
  });

  $(`#btnAProduct`).click(function () {
    addProduct();
  });

  $(`#btnFNext`).click(function () {
    CheckUsername($(`#txtFUsername`).val());
  });

  $(`#btnFUpdate`).click(function () {
    UpdatePassword($(`#btnNew`).val(), $(`#btnConfNew`).val());
  });

  $(`#btnLogin`).click(function () {
    login($(`#txtUsername`).val(), $(`#txtPassword`).val());
  });
}

//sign in
function login(username = "", password = "") {
  if (!username && !password) return;

  let indexOfUser = users.findIndex((userToFind) => {
    return (
      userToFind.username == username &&
      userToFind.password == password &&
      !userToFind.isDeleted
    );
  });

  if (indexOfUser == -1) return alert("User not found.");
  else {
    user = users[indexOfUser];
    showUsers(indexOfUser);
    $("#txtUsername").prop("readonly", true);
    $(`#txtPassword`).prop("readonly", true);
    $(`#btnLogin`).prop("class", "d-none");
    $(`#btnLogout`).prop("class", "col-3 btn btn-outline-danger");
  }

  $(`#txtUsername`).val("");
  $(`#txtPassword`).val("");
}

$(`#btnLogout`).click(function () {
  logOut();
});

//logout
function logOut() {
  user = {};
  $(`#btnLogout`).prop("class", "d-none");
  $(`#btnLogin`).prop("class", "col-3 btn btn-outline-primary");

  $(`#txtUsername`).val("");
  $(`#txtPassword`).val("");
  $("#txtUsername").prop("readonly", false);
  $(`#txtPassword`).prop("readonly", false);
  showUsers();
}

//create user
function registerUser() {
  // CREATE
  // Get values of modal
  if ($(`#txtMUsername`).val() == "") alert(`Username is required.`);
  else if ($(`#txtMPassword`).val() == "") alert(`Password is required.`);
  else if (
    $(`#txtMConfirmPassword`).val() == "" ||
    $(`#txtMPassword`).val() !== $(`#txtMConfirmPassword`).val()
  )
    alert(`Password does not match.`);
  else if ($(`#txtMAge`).val() == "") alert(`Age is required.`);
  else {
    // No Error
    users.push({
      id: users.length,
      username: $(`#txtMUsername`).val(),
      password: $(`#txtMPassword`).val(),
      age: $(`#txtMAge`).val(),
      birthdate: $(`#txtMBirthdate`).val(),
      gender: $(`input[name='rbMGender']:checked`).val(),
      isDeleted: false
    });

    $(`#txtMUsername`).val("");
    $(`#txtMPassword`).val("");
    $(`#txtMConfirmPassword`).val("");
    $(`#txtMAge`).val("");
    $(`#txtMBirthdate`).val("");

    console.log(`The size of the users array is ${users.length}`, users);
    alert("User has been successfully created."); // Alert message
    $(`#btnMClose`).click(); //for closing modal
  }
}

function showUsers(loggedInId) {
  // Show all users
  $(`#tblUsers > tbody`).html("");

  let notDeletedUsers = users.filter((user) => {
    return !user.isDeleted;
  });

  notDeletedUsers.forEach((u) => {
    let toAppend = `<tr>
      <td>${u.id}</td>
      <td>@${u.username}</td> 
      ${
        u.id == loggedInId
          ? '<td><button id="btnView" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#viewModal">View</button></td>'
          : "<td></td>"
      }
    </tr>`;
    $(`#tblUsers > tbody`).append(toAppend);
  });

  $(`#btnView`).off();
  $(`#btnView`).click(() => {
    showUser(loggedInId);
    console.log(user);
  });

  $(`#btnVUpdate`).off();
  $(`#btnVUpdate`).click(() => {
    if ($(`#txtVUsername`).val() == "") return alert(`Username is required.`);
    else if ($(`#txtVPassword`).val() == "")
      return alert(`Password is required.`);
    else if (
      $(`#txtVConfirmPassword`).val() == "" ||
      $(`#txtVPassword`).val() !== $(`#txtVConfirmPassword`).val()
    )
      return alert(`Password does not match.`);

    let updatedUser = user;
    updatedUser.username = $(`#txtVUsername`).val();
    updatedUser.password = $(`#txtVPassword`).val();
    updateUser(loggedInId, updatedUser);
    console.log("Update has been clicked.");
  });

  $(`#btnVDelete`).off();
  $(`#btnVDelete`).click(() => {
    deleteUser(loggedInId);
    console.log("Delete has been clicked.");
  });
}

//to show single user in the View Modal
function showUser(id) {
  user = users[id];
  $(`#txtVUsername`).val(user.username);
  $(`#txtVPassword`).val(user.password);
  $(`#txtVConfirmPassword`).val(user.password);
  $(`#txtVAge`).val(user.age);
  $(`#txtVBirthdate`).val(user.birthdate);
  $(`#txtVGender`).val(user.gender);
}

function updateUser(id, updatedUser) {
  users[id] = updatedUser;
  user = updatedUser;
  alert(`User ${user.username} has been successfully updated.`);
  showUsers(id);
  $(`#btnVClose`).click();
}

function deleteUser(id) {
  $(`#btnVClose`).click();
  alert(`User ${user.username} has been deleted.`);
  users[id].isDeleted = true;
  user = null;
  console.log(users);
  $(`#tblUsers > tbody`).html("");
}

function CheckUsername(username = "") {
  if (!username) return;

  let indexOfUser = users.findIndex((userToFind) => {
    return userToFind.username == username && !userToFind.isDeleted;
  });

  if (indexOfUser == -1) return alert("User not found.");
  else {
    user = users[indexOfUser];
    $("#forgotModal0").modal("hide");
    $("#forgotModal1").modal("show");
  }

  $(`#btnFUpdate`).off();
  $(`#btnFUpdate`).click(() => {
    if ($(`#btnConfNew`).val() == "")
      return alert(`Please enter your new password.`);
    else if ($(`#btnConfNew`).val() == "")
      return alert(`Re-enter your new password to confirm.`);
    else if (
      $(`#btnConfNew`).val() == "" ||
      $(`#btnNew`).val() !== $(`#btnConfNew`).val()
    )
      return alert(`Password does not match.`);

    let updateduserpass = users[indexOfUser];
    updateduserpass.password = $(`#btnNew`).val();
    updateUserPassword(updateduserpass);
    console.log("Update has been clicked.");
    $("#forgotModal1").modal("hide");
  });

  $(`#txtFUsername`).val("");
  $(`#btnNew`).val("");
  $(`#btnConfNew`).val("");
}

function updateUserPassword() {
  alert(`Password has been successfully updated.`);
  $(`#btnVClose`).click();
}
