
var should            = require('should'),
    immutabix         = require('immutabix');


describe('immutabixClient', function(){

  var immutabixClient = require('../index');

  immutabix.startServer({ port: 33445 });

  describe('immutabixClient module', function(){

    it('should exist', function(){
      should.exist(immutabixClient);
    });

    it('should have a connect function', function(){
      should(immutabixClient.connect).be.a.Function;
    })

    it('should connect to a immutabix server', function(done){
      immutabixClient.connect({
        host: '127.0.0.1',
        port: 33445,
        protocol: 'ws',
        pathname: 'some/path/'
      });
    });

  });


  //
  // describe('immutabixClient.getRaw()', function(){
  //
  //   //  ------------------------------------------------------------------------
  //   it('should return the root immutable map', function(){
  //
  //     var rawMap = immutabixClient.getRaw();
  //
  //     should(rawMap).be.an.Object;
  //     should(rawMap.toString()).equal('Map {}');
  //   });
  //   //  ------------------------------------------------------------------------
  // });
  //
  //
  //
  // describe('immutabixClient.resetRoot()', function(){
  //
  //   //  ------------------------------------------------------------------------
  //   it('should reset the root immutable map', function(){
  //
  //     var rawMap = immutabixClient.getRaw(),
  //         path   = ['foo', 'bar',' baz'],
  //         fooValue;
  //
  //     immutabixClient.set(path, 'foo-value');
  //     fooValue = immutabixClient.getRaw().getIn(path);
  //     should(fooValue).equal('foo-value');
  //
  //     immutabixClient.resetRoot();
  //     //  get again the root
  //     fooValue = immutabixClient.getRaw().getIn(path);
  //     should(fooValue).not.equal('foo-value');
  //
  //   });
  //   //  ------------------------------------------------------------------------
  // });
  //
  //
  //
  // describe('immutabixClient.set(path, value)', function(){
  //
  //   //  ------------------------------------------------------------------------
  //   it('should set a value at the given path', function(){
  //
  //     var rawMap = immutabixClient.getRaw(),
  //         path   = ['foo', 'bar',' baz'];
  //
  //     immutabixClient.set(path, 'foo-value');
  //
  //     var fooValue = immutabixClient.getRaw().getIn(path);
  //
  //     should(fooValue).equal('foo-value');
  //   });
  //   //  ------------------------------------------------------------------------
  // });
  //
  //
  //
  // describe('immutabixClient.startServer(configuration)', function(){
  //
  //   var configuration,
  //       client,
  //       connection,
  //       whenConnected,
  //       immuServer,
  //       resolveConnection;
  //
  //   whenConnected = Promise.defer();
  //
  //   configuration = {
  //     port: 44444,
  //     debug: true
  //   };
  //
  //   client = new WebSocketClient();
  //
  //   resolveConnection = function(thisConnection) {
  //     connection = thisConnection;
  //     whenConnected.resolve();
  //   };
  //
  //   client.on('connect', resolveConnection);
  //
  //
  //   beforeEach(function(){
  //     immutabixClient.resetRoot();
  //   });
  //
  //   //  ------------------------------------------------------------------------
  //   it('should start a server with the given configuration', function(done){
  //
  //     immuServer = immutabixClient.startServer(configuration);
  //
  //     client.connect('ws://localhost:44444/', 'echo-protocol');
  //
  //     whenConnected
  //     .promise
  //     .then(done);
  //   });
  //   //  ------------------------------------------------------------------------
  //
  //   //  ------------------------------------------------------------------------
  //   it( 'should listen to a set command to trigger the set function', function(done){
  //
  //     console.log('\n---- starting test for `set` command');
  //     var command,
  //         path,
  //         value;
  //
  //     path = ['aList', 1, 'title'];
  //     value = Math.random();
  //
  //     command = {
  //       type: 'set',
  //       path: ['aList'],
  //       value: [{ title: 'thing0' }, { bla: 'bla' }]
  //     };
  //
  //     whenConnected
  //     .promise
  //     .then(function(){
  //
  //       connection.sendUTF(JSON.stringify(command));
  //
  //       setTimeout(function(){
  //         var rawMap = immutabixClient.getRaw();
  //         var fooValue = immutabixClient.getRaw().getIn(path);
  //         should(fooValue).not.exist;
  //
  //         //  send 2nd command
  //         command = {
  //           type: 'set',
  //           path: ['aList'],
  //           value: [{ title: 'thing0' }, { title: 'thing1'}, { title: 'thing2'}]
  //         };
  //
  //         connection.sendUTF(JSON.stringify(command));
  //
  //       }, 20);
  //
  //       setTimeout(function(){
  //
  //         var rawMap = immutabixClient.getRaw();
  //         var valueGiven = rawMap.getIn(path);
  //         valueGiven.should.equal('thing1');
  //
  //         console.log('---- end test for `set` command');
  //         done();
  //       }, 40);
  //
  //     });
  //   });
  //   //  ------------------------------------------------------------------------
  //
  //
  //   //  ------------------------------------------------------------------------
  //   it( 'should listen to a ref command and return error '+
  //       'with a wrong path', function(done){
  //
  //     console.log('\n---- starting test for `ref` command with error');
  //     var command,
  //         path,
  //         value;
  //
  //     path = ['events', 'list', '1'];
  //
  //     command = {
  //       type: 'ref',
  //       path: path
  //     };
  //
  //     whenConnected
  //     .promise
  //     .then(function(){
  //
  //       var onMessage = function(message) {
  //
  //         var messageObj = JSON.parse(message.utf8Data);
  //
  //         should(messageObj.command).equal('ref');
  //         should(messageObj.path).be.an.Array;
  //         should(messageObj.path[0]).equal(path[0]);
  //         should(messageObj.error).be.True;
  //
  //         connection.removeListener('message', onMessage);
  //
  //         console.log('---- ending test for `ref` command with error');
  //         done();
  //       };
  //
  //       connection.on('message', onMessage);
  //
  //       connection.sendUTF(JSON.stringify(command));
  //     });
  //   });
  //   //  ------------------------------------------------------------------------
  //
  //
  //   //  ------------------------------------------------------------------------
  //   it( 'should listen to a ref command and return the ref', function(done){
  //
  //     console.log('\n---- starting test for `ref` command with changes');
  //     var command,
  //         path,
  //         value,
  //         count = 0;
  //
  //     path = ['events', 'list', '1'];
  //
  //     command = {
  //       type: 'ref',
  //       path: path
  //     };
  //
  //     whenConnected
  //     .promise
  //     .then(function(){
  //
  //       var onMessage = function(message) {
  //
  //         count += 1;
  //
  //         if(count === 3){
  //           var objMessage = JSON.parse(message.utf8Data).value;
  //           should(objMessage).have.a.property('test', 'haha');
  //           connection.removeListener('message', onMessage);
  //           console.log('---- ending test for `ref` command with changes');
  //
  //           setTimeout(function(){ done(); }, 200);
  //         }
  //       };
  //
  //       connection.on('message', onMessage);
  //
  //       connection.sendUTF(JSON.stringify(command));
  //     });
  //
  //     immutabixClient.set(path, {
  //       id: 1,
  //       list: ['foo', 'bar'],
  //       time: Date.now()
  //     });
  //
  //     setTimeout(function(){
  //       immutabixClient.set(path, {
  //         id: 1,
  //         list: null,
  //         time: Date.now()
  //       });
  //     }, 10);
  //
  //     setTimeout(function(){
  //       immutabixClient.set(path, {
  //         id: 1,
  //         test: 'haha',
  //         list: null,
  //         time: Date.now()
  //       });
  //     }, 20);
  //
  //   });
  //   //  ------------------------------------------------------------------------
  //
  //
  //
  // });

});
