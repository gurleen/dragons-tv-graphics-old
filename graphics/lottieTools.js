/**
 * Lottie Tools
 * Functions to asisst in updating Bodymovin body text
 * Author: Gurleen Singh <gs585@drexel.edu>
 * https://gurleen.dev/
 */

// Global vars
var layerList = []; // Stores list of editable text layer names.
var anim = null;    // Stores Bodymovin animation object.
var aData = null;   // Stores animation frame timing data.
var flag = "";      // Stores current animation flag.

function initAnimation(path, animData) {
    anim = bodymovin.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: path
    });

    aData = animData;

    anim.addEventListener('enterFrame', () => {
        if(anim.currentFrame >= aData.loopEndFrame && flag == 'IN') {
            anim.goToAndPlay(aData.loopStartFrame, true);
        }
        else if (anim.currentFrame == aData.startFrame && flag == 'IN') {
            anim.play();
        }
        else if (anim.currentFrame >= aData.endFrame) {
            anim.goToAndStop(aData.startFrame, true);
        }
        // document.getElementById('currentFrame').innerText = Math.floor(anim.currentFrame);
    });
}

function play() {
    flag = "IN";
    // $('#currentFlag').text("IN");
    anim.play();
}

function stop() {
    flag = "OUT";
    // $('#currentFlag').text("OUT");
}

/**
 * Updates global var layerList with editable text layer names.
 * @param {Object} node Root node of document tree
 */
function getAllNodes(node) {
    if (!node.elements || !node) { return; }
    node.elements.forEach(el => {
        if(el.textSpans) {
            layerList.push(el.data.nm);
        }
        getAllNodes(el);
    });
}

/**
 * Find a single node within tree and update its document data.
 * @param {Object} node Root node of document tree
 * @param {string} target Name of target node
 * @param {string} data Text to pass to updateDocumentData()
 */
function findNode(node, target, data) {
    if (!node.elements || !node) { return; }
    node.elements.forEach(el => {
        // console.log(el.data.nm);
        if(el.data.nm == target) {
            el.updateDocumentData({t: data})
        } else {
            findNode(el, target, data);
        }
    });
}

/**
 * Public method for updating contents of text layer.
 * @param {string} layerId Name of target layer
 * @param {string} text Text to update layerId with
 */
function updateText(layerId, text) {
    findNode(anim.renderer, layerId, text);
}