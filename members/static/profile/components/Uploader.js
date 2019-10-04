import React from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import { CardPanel, Modal, Button } from 'react-materialize';
import '../css/cropper.css';

export default class Uploader extends React.Component {
  static propTypes: {
    image: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showCropper: false,
      forceCropping: false,
      image: props.image,
    };

    this.send = this.send.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
    this.crop = this.crop.bind(this);
  }

  send() {

  }

  triggerModal() {
    this.modal.modal();
  }

  crop() {
    const self = this;
    this.setState({
      showCropper: false,
      forceCropping: false,
      image: self.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length) {
      return console.log('Rejected files: ', JSON.stringify(rejectedFiles));
    }
    this.setState({
      showCropper: true,
      forceCropping: true,
      image: acceptedFiles[0].preview,
    });
  }

  render() {
    // actions={[(<a onClick={this.send}>Envoyer</a>), (<a onClick={this.setState({showCropper: true})}/>)]}>

    const container = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      justifyContent: 'center',
      zIndex: 100,
    };

    const wrapper = {
      width: '98%',
      height: '98%',
      border: '2px dashed rgba(255,255,255,0.6)',
    };

    const content = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div>
        <div className="card hoverable" style={{ position: 'relative', }}>
          <div className="card-image">
            <Dropzone style={container} multiple={false} onDrop={this.onDrop.bind(this)}>
              <div style={wrapper}>
                <div style={content}>
                  <i style={{ color: 'rgba(255,255,255,0.6)', }} className="fa fa-upload fa-4x" aria-hidden="true"></i>
                </div>
              </div>
            </Dropzone>
            <img name="avatar" className="img-responsive" src={this.state.image}/>
          </div>
          <div className="card-action">
            <Modal
                trigger={<a waves='light' onClick={this.crop}>Crop</a>}
                ref={(x) => { this.modal = x; }}
                actions={[<Button className='left' modal='close' waves='light' onClick={this.crop} flat>Crop</Button>, <Button waves='light' modal='close' flat>Close</Button>, ]}
                modalOptions={{
                  ready: () => this.setState({ showCropper: true, }),
                }}
            >
                {this.state.showCropper &&
                    <Cropper src={this.state.image}
                        ref={(cropper) => { this.cropper = cropper; }}
                        style={{ width: '100%', height: '100%', }}
                        aspectRatio={1 / 1}
                    />
                }
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
