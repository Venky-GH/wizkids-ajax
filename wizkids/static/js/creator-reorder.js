var name;

var myglobalvar = {
  curr_topic: "some_val",
  curr_course: "some_val"
  
};

document.getElementById('reorder').onclick = function () {
  var d = document.getElementsByClassName('ord');
  name = '';
  for (var i = 0; i < d.length; i++) {
    console.log(d[i].innerHTML);
    name += String(d[i].innerHTML).trim();
  }
  
  $.getScript("/static/js/showGIF.js", function () {
    console.log("GIF working!");
  });
  $.ajax({
    url: "reord",
    data: {
      'content': name
    },
    dataType: 'text',
    success: function (response) {
      console.log("Done shuffling " + response);
      OnSuccess();
    }
  });
}

function OnSuccess(idc = -1) {
  var p;
  if (idc == -1) {
    p = $("#idcourse").val();
  }
  else {
    p = idc;
  }
  
  console.log(p);
  var tcontent = `<table id="sort" class="grid table table-striped table-dark table-hover" title="Magic Table">
    <thead>
            <tr><th class="index" scope="col">Topic Title</th><th>Description</th></tr>
    </thead>
        <tbody>`;

  $.getScript("/static/js/showGIF.js", function () {
    console.log("GIF working!");
  });

  $.ajax({
    url: "topic",
    data: {
      'content': p
    },
    dataType: 'json',
    success: function (response) {
      $.each(response, function () {
        console.log(response);
        tcontent += `
              <tr>
                <td hidden="true" class="index" scope="row">  
                </td>
                <td  class="ord">
                  ${this.fields.oid}
                </td> 
                <td>
                  ${this.fields.title}
                </td> 
                <td>
                  <button class="btn btn-success" onclick="capmodal(${this.pk})" data-toggle="modal" data-target="#topicdesc">View</button>
                  <input id="${this.pk}" hidden="true" value="${this.fields.desc}" />
                </td>
                <td>
                  <button class="btn btn-success" onclick="showcontent(${this.pk},${p})" type="submit">Know Content</button>
                </td>
                <td>
                  <span class="navbar-toggler-icon">
                  </span>
                </td>
              </tr>`;
      });
      tcontent += `</tbody></table>`;

      $.get("/static/css/reorder.css", function (css) {
        $('<style type="text/css"></style>')
          .html(css)
          .appendTo("head");
      });

      $("#showtable").html(tcontent);

      $.getScript("https://code.jquery.com/jquery-1.12.4.js", function () {
        console.log("Script-1 loaded");
        $.getScript("https://code.jquery.com/ui/1.12.1/jquery-ui.js", function () {
          console.log("Script-2 loaded");
          $.getScript("/static/js/reorder.js", function () {
            console.log("Script-3 loaded");
          });
        });
      });
      var buttons = `<button class="btn btn-success" onclick="showCourse()">Back to Courses</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success" data-toggle="modal" data-target="#addcourse">Add Topic</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="reorder" class="btn btn-success">Re-Order</button><input type="text" hidden="true" name="setvalue" id="setvalue" value="initial value" /><input type="text" hidden="true" id="idcourse" value="${p}" />`;
      $("#setbuttons").html(buttons);
      $.getScript("/static/js/creator-reorder.js", function () {
        console.log("reorder working!");
      });
    }
  });
}

function showCourse() {
  var coursetab = `<table class="grid table table-striped table-dark table-hover" title="Ordinary Table">
  <thead>
    <tr>
      <th>Course Title</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>`;

  $.getScript("/static/js/showGIF.js", function () {
    console.log("GIF working!");
  });

  $.ajax({
    url: "showC",
    data: {
      content: 'somContent'
    },
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $.each(response, function () {
        coursetab += `
        <td>
        ${this.fields.title}
      </td>
      <td>
        <button class="btn btn-success" onclick="capmodal(${this.pk})" data-toggle="modal" data-target="#topicdesc">View</button>
        <input id="${this.pk}" hidden=true value="${this.fields.desc}" />
      </td>
      <td>

      <button class="btn btn-success" onclick="knowtopics(${this.pk})" type="submit" name="goto">Know More</button>

      </td>
      </tr>
          `;
      });
      coursetab += `</tbody></table>`;

      $("#showtable").html(coursetab);

      var setbut = `<button class="btn btn-success" data-toggle="modal" data-target="#addcourse">Add Course</button>`;
      document.getElementById('setbuttons').innerHTML = setbut;
    }

  });
}

function showcontent(tid, cid) {
  console.log(tid);
  myglobalvar.curr_course = cid;
  myglobalvar.curr_topic = tid;
  var contentt = `<table id="sort" class="grid table table-striped table-dark table-hover" title="Magic Table">
  <thead>
          <tr><th class="index" scope="col">Topic Title</th><th>Description</th></tr>
  </thead>
      <tbody>`;
  $.getScript("/static/js/showGIF.js", function () {
    console.log("GIF working!");
  });

  $.ajax({
    url: "res",
    data: {
      'content': tid
    },
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $.each(response, function () {
        contentt += `
          <tr>
        <td class="index" scope="row">
          ${this.fields.oid}
        </td>
        <td  class="ord_con">
          ${this.fields.oid}
        </td>
        <td>
          ${this.fields.code}
        </td>
        <td id="${this.pk}">
          <script type="text/javascript">
          
          var obj = ${this.fields.data};

            if("${this.fields.code}" == "Q"|| "${this.fields.code}" == "T")
            {
              //console.log(obj.content.question);
              document.getElementById("${this.pk}").innerHTML = obj.content.question + "<br>" + obj.content.answer;
            }
            else if("${this.fields.code}" == "V" || "${this.fields.code}" == "P")
            {
              if("${this.fields.code}" == "V")
              {
                console.log(obj.url);
                document.getElementById("${this.pk}").innerHTML = '<video controls preload="none" src="' + obj.url + '" ></video>';
              }
              else if("${this.fields.code}" == "P")
              {
                document.getElementById("${this.pk}").innerHTML = '<img src="' + obj.url + '" width="10%" height="20%" alt="some image" >';
              }
            }
            else if("${this.fields.code}" == "M"){
              document.getElementById("${this.pk}").innerHTML = obj.ques;
            }
          </script>

        </td>
        <td>
        <span class="navbar-toggler-icon"></span>
      </td>
      </tr>
          `;
      });
      contentt += `</tbody></table>`;
      $.get("/static/css/reorder.css", function (css) {
        $('<style type="text/css"></style>')
          .html(css)
          .appendTo("head");
      });

      $("#showtable").html(contentt);

      $.getScript("https://code.jquery.com/jquery-1.12.4.js", function () {
        console.log("Script-1 loaded");
        $.getScript("https://code.jquery.com/ui/1.12.1/jquery-ui.js", function () {
          console.log("Script-2 loaded");
          $.getScript("/static/js/reorder.js", function () {
            console.log("Script-3 loaded");
          });
        });
      });
      var buttons = `<div class="container">
        <div><button class="btn btn-success" onclick="OnSuccess('${cid}')">Back to Topics</button></div><br>
        <div class="row">
          <div class="col-md-3">
            <button class="btn btn-success" data-toggle="modal" data-target="#addresource2">Add text/Questions</button>
          </div>
          <div class="col-md-3">
              <button class="btn btn-success" data-toggle="modal" data-target="#addresource">Add Video/Pictures</button>
          </div>
      
          <div class="col-md-3">
              <button class="btn btn-success" data-toggle="modal" data-target="#addresource3">Add MCQ</button>
          </div>
      
          <div class="col-md-3">
            <button onclick="func()" class="btn btn-success">Re-Order</button>
            <input type="text" hidden=true name="setvalue" id="setvalue" value="initial value" />
          </div>
        </div>
      </div>`;
      $("#setbuttons").html(buttons);
      $.getScript("/static/js/creator-reorder.js", function () {
        console.log("reorder working!");
      });
    }
  });
}


function func() {
  var d = document.getElementsByClassName('ord_con');
  name = '';
  for (var i = 0; i < d.length; i++) {
    console.log(d[i].innerHTML);
    name += String(d[i].innerHTML).trim();
  }
  
  $.getScript("/static/js/showGIF.js", function () {
    console.log("GIF working!");
  });
  $.ajax({
    url: "reordres",
    data: {
      'content': name
    },
    dataType: 'text',
    success: function (response) {
      console.log("Done shuffling " + response);
      showcontent(myglobalvar.curr_topic, myglobalvar.curr_course);
    }
  });
}