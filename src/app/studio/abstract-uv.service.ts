import * as THREE from 'three';
import GLTFExporter from 'three-gltf-exporter';
import OBJExporter from 'three-obj-exporter';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ElementRef, OnDestroy, ViewChild } from '@angular/core';
export abstract class BaseUvEngine implements OnDestroy {
    private canvas: HTMLCanvasElement;
    protected camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    protected scene: THREE.Scene;
    private light: THREE.AmbientLight;
    protected object: THREE.Mesh;

    private frameId: number = null;

    @ViewChild('rendererCanvas', {static: true})
    public rendererCanvas: ElementRef<HTMLCanvasElement>;

    setCamera() {
        const aspect = this.canvas.width/this.canvas.height;
        //const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
        this.camera.position.set(0, 5, 10);
    }
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });
        // this.renderer.setSize(this.canvas.width*2, this.canvas.height*2);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    createScene() {
        this.canvas = this.rendererCanvas.nativeElement;

        this.scene = new THREE.Scene();
        //Add Camera
        this.setCamera()
        this.setRenderer();
        this.setMouseControls();
        this.setLight();
        //this.setGridHelper();
        this.createObject()
        //this.scene.add(this.camera);
        this.render();

    }
    abstract createObject();
    setMouseControls() {
        //Add mouse controls
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    setLight() {
        //Add light
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.setScalar(10);
        this.scene.add(this.light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 1));
    }
    setGridHelper() {
        //Add Grid Helper
        this.scene.add(new THREE.GridHelper(20, 20));
    }
    render() {
        this.frameId = requestAnimationFrame(() => {
            this.render();
        });
        //this.cube.rotation.x +=0.01;
        //this.cube.rotation.y +=0.01;
        this.renderer.render(this.scene, this.camera);
    }
    ngOnDestroy() {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
        }
    }
    export(format: string) {
        switch (format) {
            case 'GLTF': {
                this.exportUsing(new GLTFExporter());
                break;
            }
            default: {
                this.exportUsing(new OBJExporter());
                break;
            }
        }
    }
    exportUsing(exporter) {
        const options = {
            trs: true,
            onlyVisible: false,
            binary: true,
            truncateDrawRange: false,
            forceIndices: false,
            forcePowerOfTwoTextures: false
        };
        // Parse the input and generate the glTF output
        exporter.parse([this.scene, this.object], (result) => {
            if (result instanceof ArrayBuffer) {
                this.downloadArrayBuffer(result, 'model.glb');
            } else {
                this.downloadString(result, 'model.gltf');
            }
        }, options);
    }
    downloadString(text, filename) {
        this.downloadJSON(new Blob([JSON.stringify(text)], { type: 'text/json' }), filename);
    }
    downloadArrayBuffer(buffer, filename) {
        this.downloadJSON(new Blob([buffer], { type: 'application/octet-stream' }), filename);
    }
    downloadJSON(blob: Blob, filename: string) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}