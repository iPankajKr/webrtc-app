// webrtc.js
import Peer from 'peerjs';

class WebRTC {
    constructor() {
        this.peer = null;
        this.initializePeerConnection();
    }

    initializePeerConnection() {
        if (typeof window !== 'undefined') {
            this.peer = new Peer();

            // Setting up a WebRTC peer connection
            this.peer.on('open', (id) => {
                console.log('My peer ID is: ' + id);
            });

            this.peer.on('call', (call) => {
                // Handle incoming call
                console.log('Incoming call from peer:', call.peer);

                // Answer the call and stream your video
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((stream) => {
                        // Display local stream
                        const localVideo = document.getElementById('localVideo');
                        localVideo.srcObject = stream;

                        // Answer the call
                        call.answer(stream);

                        // Handle the stream on the other end as needed
                        call.on('stream', (remoteStream) => {
                            // Display remote stream
                            const remoteVideo = document.getElementById('remoteVideo');
                            remoteVideo.srcObject = remoteStream;

                            // For simplicity, log the remoteStream to console
                            console.log('Stream received from peer:', call.peer, 'Remote stream:', remoteStream);
                        });
                    })
                    .catch((error) => {
                        console.error('Error answering call:', error);
                    });
            });
        }
    }

    initiateCall(peerId) {
        if (typeof window !== 'undefined') {
            // Initiate a call to the specified peer
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    // Display local stream
                    const localVideo = document.getElementById('localVideo');
                    localVideo.srcObject = stream;

                    const call = this.peer.call(peerId, stream);

                    // Handle call events
                    call.on('stream', (remoteStream) => {
                        // Display remote stream
                        const remoteVideo = document.getElementById('remoteVideo');
                        remoteVideo.srcObject = remoteStream;

                        // For simplicity, log the remoteStream to console
                        console.log('Stream received from peer:', peerId, 'Remote stream:', remoteStream);
                    });

                    // Handle the stream on the other end as needed
                    console.log('Calling peer ID:', peerId, 'Streaming:', stream);
                })
                .catch((error) => {
                    console.error('Error initiating call:', error);
                });
        }
    }
}

export default WebRTC;
