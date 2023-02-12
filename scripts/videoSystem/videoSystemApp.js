"use strict";

import VideoSystem from "./videoSystemModel.js";
import VideoSystemView from "./videoSystemView.js";
import VideoSystemController from "./videoSystemController.js";

let VideoSystemApp;


(function() {
	VideoSystemApp = new VideoSystemController(
		VideoSystem.getInstance(), new VideoSystemView()
	);
})();

export default VideoSystemApp;
