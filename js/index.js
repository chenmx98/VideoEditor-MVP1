const actualBtn = document.getElementById('actual-btn');

const fileChosen = document.getElementById('file-chosen');

actualBtn.addEventListener('change', function(){
  fileChosen.textContent = this.files[0].name
})

function updateProgressBar(percent){
    $("#uploadprogress").css('width',percent+"%");
    $("#uploadprogress").html(percent+"%");

    if(percent == 100){
        setTimeout(function(){
            updateProgressBar(0);
        },2000);
    }
}

function setLoader(status = true){
    if(status) $("#loaderModal").modal("show");
    else $("#loaderModal").modal("hide");
}

var app = new Vue({
  el: '#app',
  data: {
    originalvideos: [],  //original video clips added by user
    videos: [],  //current clips being edited
  },
  delimiters: ['[[',']]'],
  methods: {

      addVideo: function(){
          this.originalvideos.push({});
        this.videos.push({});  
      },

    setRenderVideo: function(videoID){
        // console.log("videoID",videoID);
        $("#render").attr('src',window.location.href + this.videos[videoID].file);
    },

    reloadOriginalVideo: function(videoID){
        this.videos[videoID] = {name:this.originalvideos[videoID].name,file:this.originalvideos[videoID].file};
        app.setRenderVideo(videoID);
    },

    removeVideo: function(videoID){
        // permanently removes the video
        this.videos.splice(videoID,1);
        this.originalvideos.splice(videoID,1);
        $("#render").attr('src',"");
    },

    editVideoSubmit: function(videoID,actiontype){
        console.log("editVideoSubmit",videoID);
        setLoader(true);

        let video = this.videos[videoID].file;
        
        if(video === undefined){
            toastr.warning("Video is empty!");
            return;
        }
        
        let editor_payload = {};

        if(actiontype == "trim"){
            editor_payload = {
                trim_start: $("#trim_start"+videoID).val(),
                trim_end: $("#trim_end"+videoID).val()
            } 
        }

        editor_payload.videofile = video;
        console.log("editor_payload",editor_payload);
        // send edit request to backend and render the preview returned by server
        $.post("/edit_video/" + actiontype,editor_payload,function(res){
            // console.log("Editor Response",res);
            setLoader(false);
            if(res.status == "success"){
                app.videos[videoID].file = res.edited_videopath;
                app.setRenderVideo(videoID);
                toastr.success(res.message);
            }
            else{
                toastr.error(res.message);
            }
        });
    },

    uploadVideoFile: function() {
        updateProgressBar(0);

        let clipname = $("#clipname").val();
          let filedata = document.getElementById('fileinput').files[0];
          if(!filedata){
              toastr.warning("File is empty!");
              return;
          }
          if(clipname == ""){
              toastr.warning("Clip name is required!");
              return;
          }	

          const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              // console.log(percentCompleted)
              updateProgressBar(percentCompleted);
              
            }
          }

          let data = new FormData()
          data.append('videofile', filedata);

          axios.post('/upload_video', data, config)
            .then(res => {
                console.log(res);
     
                this.originalvideos.push({name:clipname,file:res.data});
                this.videos.push({name:clipname,file:res.data});
                 console.log("videos",this.videos);
                toastr.success('Video uploaded!');

                app.setRenderVideo(this.videos.length - 1);
                
            })
            .catch(err => console.log(err))
    },

    finalrender: function(){
        setLoader(true);

        let requestobj = {videoscount: this.videos.length}
        for(let i=0;i<this.videos.length;i++){
            requestobj['video' + i] = this.videos[i].file;
        }

        console.log("requestobj",requestobj);

        $.post("/merged_render",requestobj,function(res){
            console.log(res);

            if(res.status == "success"){
                toastr.success("Final render success!");
                $("#render").attr('src',window.location.href + res.finalrender_videopath);
            }
            else{
                toastr.error("Final render ERROR: " + res.message);
            }
            
            setLoader(false);
        });
    }
  },
  // created() {
  // }
})