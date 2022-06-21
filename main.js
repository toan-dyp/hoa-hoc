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
          <button value="${video.src}" type="button" class="btn btn-primary showVideo mt-1" data-bs-toggle="modal" data-bs-target="#model__Video">
            ${video.ten}
          </button>
      `
    }

    let downloadFile = !data[i].file ? `
    <td>
      <a href="${data[i].file}" type="button" class="btn btn-primary">
        Download
      </a>
    </td>
    ` : '';

    let dataRender = `
    <tr>
      <td>${data[i].buoi}</td>
      <td>${data[i].chuyen_de}</td>
      <td>${baigiang}</td>
      ${downloadFile};
    </tr>`
    await $('#displayData').append(dataRender);
  }
}


$(async () => {
  const data = await getData();
  await renderData(data);

  $('.showVideo').click((e) => {
    let srcVideo = e.target.value;
    $("#video").attr('src', srcVideo);
  })

  $('#model__Video').on('hide.bs.modal', () => {
    $("#video").attr('src', '');
  })

});