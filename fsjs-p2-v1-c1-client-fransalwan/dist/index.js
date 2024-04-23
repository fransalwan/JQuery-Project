const baseUrl = "https://restaurant-server.frans.biz.id";

function handleCredentialResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);

  $.ajax({
    method: "POST",
    url: `${baseUrl}/OAuthLogin`,
    headers: {
      google_token: response.credential,
    },
  })
    .done((result) => {
      // console.log(result, "ini result");
      localStorage.setItem("access_token", result.access_token);
      localStorage.username = result.username;
      localStorage.role = result.role;
      localStorage.id = result.id;
      showDashboard();
    })
    .fail((error) => {
      // console.log("masuk sini");
      console.log(error);
    });
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "168733778258-3u3d7t3qu4nh8k24c9j4oqv15m7nco4f.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};

// * document ready
$(document).ready(function () {
  // * Ambil data Cuisines dan category
  $.ajax({
    method: "GET",
    url: `${baseUrl}/cuisines`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      console.log(response.length);
      $("#total-product").html(response.length);
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });

  $.ajax({
    method: "GET",
    url: `${baseUrl}/categories`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      console.log(response.length);
      $("#total-category").html(response.length);
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });

  if (localStorage.getItem("access_token")) {
    showDashboard();
    let username = localStorage.getItem("username");
    $("#username").html(username);
  } else {
    //     showDashboard();
    showLogin();
  }

  $("#register-form").on("submit", function (e) {
    e.preventDefault();
    const username = $("#register-username").val();
    const email = $("#register-email").val();
    const password = $("#register-password").val();
    const phoneNumber = $("#register-phone").val();
    const address = $("#register-address").val();
    $.ajax({
      method: "POST",
      url: `${baseUrl}/register`,
      data: {
        username,
        email,
        password,
        phoneNumber,
        address,
      },
    })
      .done(function (data) {
        res.send(data);
      })
      .fail(function (err, status) {
        console.log(err);
      });
  });

  $("#login-section").on("submit", function (e) {
    e.preventDefault();

    const email = $("#login-email").val();
    const password = $("#login-password").val();

    //     console.log(email, password);

    $.ajax({
      method: "POST",
      url: `${baseUrl}/login`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        email,
        password,
      },
    })
      .done(function (res) {
        // console.log(res);
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("username", res.username);

        let username = localStorage.getItem("username");

        $("#username").html(username);

        showDashboard();
      })
      .fail(function (jqXHR) {
        console.log(jqXHR);
      });
  });

  $("#nav-logout").click(() => {
    localStorage.clear();
    showLogin();
  });

  $("#nav-category").on("click", function (e) {
    e.preventDefault();
    showAllCategory();
  });

  $("#new-category").on("click", function (e) {
    e.preventDefault();
    formAddCategory();
  });

  $("#nav-product").on("click", function (e) {
    e.preventDefault();
    showAllCuisines();
  });

  $("#new-product").on("click", function (event) {
    formAddCuisines();
    addNewCuisineForm();
  });

  $("#category-form").on("submit", function (event) {
    event.preventDefault();
    const name = $("#category-name").val();
    $.ajax({
      method: "POST",
      url: `${baseUrl}/categories`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        name,
      },
    })
      .done((response) => {
        showAllCategory();
      })
      .fail((jqXHR) => {
        console.log(jqXHR);
      });
  });

  $("#product-form").on("submit", function (event) {
    event.preventDefault();
    const name = $("#product-name").val();
    const description = $("#product-desc").val();
    const categoryId = $("#product-category").val();
    const price = $("#product-price").val();
    const imgUrl = $("#product-image").val();

    console.log(name, description, categoryId, price, imgUrl);
    $.ajax({
      method: "POST",
      url: `${baseUrl}/cuisines`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        access_token: localStorage.getItem("access_token"),
      },
      data: {
        name,
        description,
        categoryId,
        price,
        imgUrl,
      },
    })
      .done((response) => {
        showAllCuisines();
      })
      .fail((jqXHR) => {
        console.log(jqXHR);
      });
  });
});

// * Show-hide
function showLogin() {
  $("#login-section").show();
  $("#home-section").hide();
  $("#navbar").hide();
}

function showDashboard() {
  $("#login-section").hide();
  $("#preloader").hide();
  $("#navbar").show();
  $("#dashboard-section").show();
  $("#product-section").hide();
  $("#new-product-section").hide();
  $("#category-section").hide();
  $("#new-category-section").hide();
}

function showAllCuisines() {
  fetchAllCuisines();
  $("#login-section").hide();
  $("#preloader").hide();
  $("#navbar").show();
  $("#dashboard-section").hide();
  $("#product-section").show();
  $("#new-product-section").hide();
  $("#category-section").hide();
  $("#new-category-section").hide();
}

function formAddCuisines() {
  $("#login-section").hide();
  $("#preloader").hide();
  $("#navbar").show();
  $("#dashboard-section").hide();
  $("#product-section").hide();
  $("#new-product-section").show();
  $("#category-section").hide();
  $("#new-category-section").hide();
}

function showAllCategory() {
  $("#navbar").show();
  $("#login-section").hide();
  $("#dashboard-section").hide();
  $("#product-section").hide();
  $("#new-product-section").hide();
  $("#category-section").show();
  $("#new-category-section").hide();
  fetchAllCategories();
}
function formAddCategory() {
  $("#navbar").show();
  $("#login-section").hide();
  $("#dashboard-section").hide();
  $("#product-section").hide();
  $("#new-product-section").hide();
  $("#category-section").hide();
  $("#new-category-section").show();
}

// * method
function addNewCuisineForm() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/categories`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      console.log(response);
      let result =
        "<option value='' selected disabled> -- Select Category -- </option>";

      response.forEach((item) => {
        result += `<option value=${item.id}>${item.name}</option>`;
      });

      $("#product-category").html(result);
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });
}

function fetchAllCuisines() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/cuisines`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      // console.log(response, "<<<<<<<");
      let result = "";

      response.forEach((item, index) => {
        console.log(item);
        result += `<tr>
        <td>${index + 1}</td>
        <td>
            <img style="width: 50px; height: 50px; object-fit: cover;" src="${
              item.imgUrl
            }" alt="">
        </td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.User.username}</td>
        <td>
            <a href="" class="ms-3">
                <span class="icon material-symbols-outlined text-danger" onclick="deleteCuisine(event, ${
                  item.id
                })">delete</span>
            </a>
        </td>

    </tr>`;
      });

      // console.log(result, "<<<<<<< ini result");

      $("#table-product").html(result);
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });
}

function deleteCuisine(event, id) {
  event.preventDefault();
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/cuisines/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      fetchAllCuisines();
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });
}

function fetchAllCategories() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/categories`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      let result = "";
      response.forEach((item, index) => {
        result += `<tr>
          <td scope="row">${index + 1}</td>
          <td class="fw-bold">${item.name}</td>
          <td onclick="deleteCategory(event,${item.id})">
              <a href="" class="ms-3"><span
                      class="icon material-symbols-outlined text-danger">delete</span></a>
          </td>
      </tr>`;
        $("#table-category").html(result);
      });
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });
}

function deleteCategory(event, id) {
  event.preventDefault();
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/categories/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done((response) => {
      fetchAllCategories();
    })
    .fail((jqXHR) => {
      console.log(jqXHR);
    });
}
