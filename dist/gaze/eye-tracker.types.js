"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GazeTrackingState = void 0;
/** 트래킹 상태 (CRGaze 전용) */
var GazeTrackingState;
(function (GazeTrackingState) {
    GazeTrackingState[GazeTrackingState["TRACKING"] = 0] = "TRACKING";
    GazeTrackingState[GazeTrackingState["BLINK"] = 1] = "BLINK";
    GazeTrackingState[GazeTrackingState["LOST"] = 2] = "LOST";
})(GazeTrackingState || (exports.GazeTrackingState = GazeTrackingState = {}));
