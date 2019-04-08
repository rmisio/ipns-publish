import React, { Component } from 'react';
import IPFS from 'ipfs';
import './App.css';

class App extends Component {
  state = {

  }

  async componentDidMount() {
    const node = window.node = new IPFS({
      EXPERIMENTAL: {
        pubsub: true,
        ipnsPubsub: true,
      }
    });

    console.log(await node.version());

    node.on('ready', async () => {
      const nodeId = await node.id();
      console.log(`my node id is ${nodeId.id}`);

      const gatewayBase = 'https://gateway.ipfs.io';
      const randomToken = Math.random().toString().slice(0, 6);

      const fileAdded = await node.add({
        path: 'happy.times',
        content: Buffer.from(`I am happy. I am good. (${randomToken})`),
      })

      const fileIpfsUrl = `/ipfs/${fileAdded[0].hash}`;
      console.log(`Added file - ${gatewayBase}${fileIpfsUrl}`);
      console.dir(fileAdded);

      console.log(`publishing ${fileIpfsUrl}`);
      const filePublished = await node.name.publish(fileIpfsUrl);

      console.log('File published.');
      console.dir(filePublished);

      const fileIpnsUrl = `/ipns/${nodeId.id}/happy.times`;
      console.log(`resolving via ${fileIpnsUrl}`);
      const nameResolve = await node.name.resolve(fileIpnsUrl);

      console.log('Name resolved. Boom.');
      console.dir(nameResolve);

      console.log(`File published to ipns - ${gatewayBase}${fileIpnsUrl}`);

      const fileCat = await node.cat(nameResolve.path);

      console.log('catted dat file dog. cat.');
      console.log(fileCat.toString());
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }
}

export default App;
