// const data = [
//   {
//     'buoi': 'aaaaaaaa',
//     'chuyen_de': 'aaa',
//     'baigiang': [
//       {
//         'ten': 'aaaaaa',
//         'src': 'aaa'
//       }
//     ],
//     'file': 'aaaaa'
//   }
// ]

let getData = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'https://api-get-video.herokuapp.com/api',
      success: (res) => {
        resolve(res);
      }
    });
  })
}

let renderData = async (data) => {
  for (i = 0; i < data.length; i++) {
    let baigiang = ``;

    for (j = 0; j < data[i].baigiang.length; j++) {
      let video = data[i].baigiang[j];
      baigiang += `
          <button value="${video.src}" type="button" class="btn btn-primary showVideo" data-bs-toggle="modal" data-bs-target="#model__Video">
            ${video.ten}
          </button>
      `
    }

    let dataRender = `
    <tr>
      <td>${data[i].buoi}</td>
      <td>${data[i].chuyen_de}</td>
      <td>${baigiang}</td>
      <td>${data[i].file}</td>
    </tr>`
    await $('#displayData').append(dataRender);
  }
}

// let showVideo = (e) => {
//   console.log(e);
// }

$(async () => {
  // $.ajax({
  //   type: "GET",
  //   dataType: 'json',
  //   url: 'https://api-get-video.herokuapp.com/api',
  //   success: function (response) {
  //     console.log(response);
  //   }
  // });
  const data = await getData();
  // console.log(data);
  await renderData(data);

  $('.showVideo').click((e) => {
    let srcVideo = e.target.value;
    $("#video").attr('src', srcVideo);
  })

  $('#model__Video').on('hide.bs.modal', () => {
    $("#video").attr('src', '');
  })

});