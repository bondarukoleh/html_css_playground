#### Audio and Video
Before HTML5 there was < embed > < object > and flash player, which iOS isn't support at all.
< audio > element at its absolute simplest:
```html
<p>Hear us rock out with our new song,<cite>Death to Rubber Duckies</cite>:</p>
<audio src="rubberduckies.mp3" controls preload="metadata"></audio>
```
The src attribute provides the file name of the audio file you want to play. The controls attribute tells the browser
to include a basic set of playback controls. \
There’s no limit on the amount of audio you can play at once.

```html
<video src="butterfly.mp4" controls width="400" height="300" poster="swiss_alps.jpg"></video>
```
The `mediagroup` attribute might be a useful tool if you need to synchronize concurrent video files.

##### Understanding the HTML5 Media Formats
MP3/.mp3 MIME - audio/mp3 \
Ogg Vorbis/.ogg MIME - audio/ogg \
WAV/.wav MIME - audio/wav \
H.264/.mp4  MIME - video/mp4\
WebM/.webm MIME - video/webm \
Ogg Theora/.ogv  MIME - video/ogv\
To realize why formats this is important, there are actually `three standards at play in a video file`. \
First, and most obviously, is the `video codec`, which compresses the video into a stream of data. \
Second is the audio codec, which compresses one or more tracks of audio using a related standard. \
Third is the container format, which packages everything together with some descriptive information and, optionally, \
other frills like still images and subtitles. Often, the file extension refers to the container format, so .mp4 \
signifies an MPEG-4 container, .ogv signifies an Ogg container, and so on. \
Here’s the tricky part: Most container formats support a range of different video and audio standards. \

A MIME type (content type) is a piece of information that identifies the type of content in a web resource. \
e.g. the MIME type of a web page is text/html. Before a web server sends a resource to a browser, it sends the MIME \
type.

`Timed Text Tracks and WebVTT`
A subtitle is a caption that appears superimposed (added on) on a video, and a sequence of subtitles is a timed text
track. There are many diff formats, they all have fundamental similarities, they are ordinary text with time markings
and are placed in chronological order in an ordinary text file. Here’s an example of a timed tracks in WebVTT
(Web Video Text Tracks Format). It holds four captions:
```text
WEBVTT
VIDEO CAPTIONS
00:00:05.000 --> 00:00:10.000
This caption appears 5 seconds in and lingers until the 10 second mark.
00:01:00.000 --> 00:01:10.000
Now 1 minute has passed. Think about that for 10 seconds.
00:01:10.000 --> 00:01:15.000
This caption appears immediately after the second caption disappears.
00:01:30.000 --> 00:01:35.000
Captions can use <i>line breaks</i> and <b>simple</b> HTML markup.
```
It's easy to add caption to video:
```html
<video controls width="700" height="400">
<source src="butterfly.mp4" type="video/mp4">
<track src="butterfly.vtt" srclang="en" kind="subtitles" label="English" default>
</video>
```
Captions - for the same language as the spoken audio. \
Subtitles - for spoken audio translated into another language. \
One of the fallbacks - [Captionator.js](http://captionatorjs.com) - works by placing a floating element over the video
window, when playback reaches the appropriate points, Captionator.js retrieves the caption text from the WebVTT file
and inserts it into the floating element.

