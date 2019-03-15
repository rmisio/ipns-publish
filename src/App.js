import React, { Component } from 'react';
import IPFS from 'ipfs';
import './App.css';

class App extends Component {
  state = {

  }

  componentDidMount() {
    console.log('i be mounted');

    const node = this.node = new IPFS();

    node.on('ready', async () => {
      console.log('the node is moo');
      window.moo = this.node;

      // window.zillow = node.libp2p.handle('/openbazaar/app/1.0.0', (protocol, conn) => {
      //   console.log('pulling in incoming message');
      // });

      const nodeId = await node.id();
      const randomToken = Math.random().toString().slice(0, 6);

      const fileAdded = await node.add({
        path: 'happy.times',
        content: Buffer.from(`I am happy. I am good. (${randomToken})`),
      })

      console.log('Added file:');
      console.dir(fileAdded);

      const filePublished = await node.name.publish(`/ipfs/${fileAdded[0].hash}`);

      console.log('File published.');
      console.dir(filePublished);

      const nameResolve = await node.name.resolve(`/ipns/${nodeId.id}/happy.times`);

      console.log('Name resolved. Boom.');
      console.dir(nameResolve);

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
