from flask import Flask
from flask import request
from flask import render_template
from flask import send_file
from flask import send_from_directory

from video_utils import *
from config import *
import os

app = Flask(__name__)

# Serves static webpage at the root directory (this is how we use a flask api route)
@app.route('/')
def hello_world():
    return render_template("video_editor.html")


# Serves the appropriate file selected in the clips folder
@app.route('/clips/<filename>')
def renderClip(filename):
	return send_file(video_savepath + filename)

@app.route('/')
def uploaded_file(filename):
    return send_file("videojs-sprite-thumbnails.min.js")

# Uploads a video file to server and returns filename
# Added note: The POST method indicates some form was filled out on the front end (video_editor.html)
# In this context, an upload button is pressed, the video is then submitted with the POST form (which we upload here!)
@app.route('/upload_video',methods=['POST'])
def uploadVideo():
	# check if video savepath exists
	if  not os.path.isdir("./clips"):
		os.mkdir("./clips")
	try:
		videofile = request.files['videofile']
		filepath = video_savepath + videofile.filename
		videofile.save(filepath)
	except:
		return "ERROR"

	return str(filepath)



# Main video editing pipeline2
# The front end we choose which option to edit the video
# See functions in video_utils.py
@app.route('/edit_video/<actiontype>',methods=['POST'])
def editVideo(actiontype):
	if actiontype == "trim":
		try:
			# if sucessfull, we should see an HTTP 200 (OKAY) protocol meaning the operation was sucessful.
			edited_videopath = trimVideo(request.form['videofile'],int(request.form['trim_start']),int(request.form['trim_end']))
			return {
				"status": "success",
				"message": "video edit success",
				"edited_videopath": edited_videopath
			}
		except Exception as e:
			return {
				"status": "error",
				"message": "video edit failure: " + str(e),
			}

    
@app.route('/merged_render',methods=['POST'])
def mergedRender():
	try:
		videoscount = int(request.form['videoscount'])
		if videoscount > 0:
			videoclip_filenames = []
			for i in range(videoscount):
				videoclip_filenames.append(request.form['video' + str(i)])

			finalrender_videopath = mergeVideos(videoclip_filenames)
			return {
					"status": "success",
					"message": "merged render success",
					"finalrender_videopath": finalrender_videopath
				}
		else:
			return {
					"status": "error",
					"message": "merged render error. Invalid videos count"
				}
		
	except Exception as e:
		return {
			"status": "error",
			"message": "video merge failure: " + str(e),
		}

