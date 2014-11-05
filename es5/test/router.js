"use strict";
var $__traceur_64_0_46_0_46_7__,
    $___46__46__47_lib_47_export_46_js__,
    $__quiver_45_promise__,
    $__quiver_45_stream_45_util__,
    $__quiver_45_http__,
    $__chai__,
    $__chai_45_as_45_promised__;
($__traceur_64_0_46_0_46_7__ = require("traceur"), $__traceur_64_0_46_0_46_7__ && $__traceur_64_0_46_0_46_7__.__esModule && $__traceur_64_0_46_0_46_7__ || {default: $__traceur_64_0_46_0_46_7__});
var $__0 = ($___46__46__47_lib_47_export_46_js__ = require("../lib/export.js"), $___46__46__47_lib_47_export_46_js__ && $___46__46__47_lib_47_export_46_js__.__esModule && $___46__46__47_lib_47_export_46_js__ || {default: $___46__46__47_lib_47_export_46_js__}),
    makeRouter = $__0.makeRouter,
    methodRouter = $__0.methodRouter,
    makeRouteList = $__0.routeList,
    createHttpHandler = $__0.httpHandler,
    simpleHandler = $__0.simpleHandler,
    simpleHandlerBuilder = $__0.simpleHandlerBuilder,
    loadSimpleHandler = $__0.loadSimpleHandler,
    loadHttpHandler = $__0.loadHttpHandler;
var async = ($__quiver_45_promise__ = require("quiver-promise"), $__quiver_45_promise__ && $__quiver_45_promise__.__esModule && $__quiver_45_promise__ || {default: $__quiver_45_promise__}).async;
var $__2 = ($__quiver_45_stream_45_util__ = require("quiver-stream-util"), $__quiver_45_stream_45_util__ && $__quiver_45_stream_45_util__.__esModule && $__quiver_45_stream_45_util__ || {default: $__quiver_45_stream_45_util__}),
    streamableToText = $__2.streamableToText,
    textToStreamable = $__2.textToStreamable,
    emptyStreamable = $__2.emptyStreamable;
var $__3 = ($__quiver_45_http__ = require("quiver-http"), $__quiver_45_http__ && $__quiver_45_http__.__esModule && $__quiver_45_http__ || {default: $__quiver_45_http__}),
    RequestHead = $__3.RequestHead,
    ResponseHead = $__3.ResponseHead;
var chai = ($__chai__ = require("chai"), $__chai__ && $__chai__.__esModule && $__chai__ || {default: $__chai__}).default;
var chaiAsPromised = ($__chai_45_as_45_promised__ = require("chai-as-promised"), $__chai_45_as_45_promised__ && $__chai_45_as_45_promised__.__esModule && $__chai_45_as_45_promised__ || {default: $__chai_45_as_45_promised__}).default;
chai.use(chaiAsPromised);
var should = chai.should();
describe('router component test', (function() {
  it('static route', async($traceurRuntime.initGeneratorFunction(function $__11() {
    var handlerComponent,
        router,
        handler;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            handlerComponent = simpleHandler((function(args, input) {
              input.should.equal('hello');
              return 'goodbye';
            }), 'text', 'text');
            router = makeRouter().staticRoute('/foo', handlerComponent);
            $ctx.state = 14;
            break;
          case 14:
            $ctx.state = 2;
            return loadSimpleHandler({}, router, 'text', 'text');
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = 6;
            return handler({path: '/foo'}, 'hello').should.eventually.equal('goodbye');
          case 6:
            $ctx.maybeThrow();
            $ctx.state = 8;
            break;
          case 8:
            $ctx.state = 10;
            return handler({path: '/bar'}, 'nothing').should.be.rejected;
          case 10:
            $ctx.maybeThrow();
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__11, this);
  })));
  it('regex route', async($traceurRuntime.initGeneratorFunction(function $__12() {
    var greet,
        router,
        handler;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            greet = simpleHandler((function(args, input) {
              input.should.equal('hello');
              args.name.should.equal('john');
              return 'goodbye, ' + args.name;
            }), 'text', 'text');
            router = makeRouter().regexRoute(/^\/greet\/(\w+)$/, ['name'], greet);
            $ctx.state = 10;
            break;
          case 10:
            $ctx.state = 2;
            return loadSimpleHandler({}, router, 'text', 'text');
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = 6;
            return handler({path: '/greet/john'}, 'hello').should.eventually.equal('goodbye, john');
          case 6:
            $ctx.maybeThrow();
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__12, this);
  })));
  it('param route', async($traceurRuntime.initGeneratorFunction(function $__13() {
    var greet,
        router,
        handler;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            greet = simpleHandler((function(args, input) {
              input.should.equal('hello');
              return 'goodbye, ' + args.name;
            }), 'text', 'text');
            router = makeRouter().paramRoute('/greet/:name', greet);
            $ctx.state = 10;
            break;
          case 10:
            $ctx.state = 2;
            return loadSimpleHandler({}, router, 'text', 'text');
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = 6;
            return handler({path: '/greet/foo'}, 'hello').should.eventually.equal('goodbye, foo');
          case 6:
            $ctx.maybeThrow();
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__13, this);
  })));
  it('route list', async($traceurRuntime.initGeneratorFunction(function $__14() {
    var foo,
        bar,
        defaultPage,
        routeList,
        router,
        handler;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            foo = simpleHandlerBuilder((function(config) {
              should.not.exist(config.barModified);
              config.fooModified = true;
              return (function(args) {
                args.path.should.equal('/foo');
                return 'foo';
              });
            }), 'void', 'text');
            bar = simpleHandlerBuilder((function(config) {
              should.not.exist(config.fooModified);
              config.barModified = true;
              return (function(args) {
                args.path.should.equal('/subpath');
                args.id.should.equal('baz');
                return 'bar';
              });
            }), 'void', 'text');
            defaultPage = simpleHandler((function(args) {
              return 'default page';
            }), 'void', 'text');
            routeList = makeRouteList().staticRoute('/foo', foo).paramRoute('/bar/:id/:restpath', bar);
            router = makeRouter().routeList(routeList).defaultRoute(defaultPage);
            $ctx.state = 18;
            break;
          case 18:
            $ctx.state = 2;
            return loadSimpleHandler({}, router, 'void', 'text');
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = 6;
            return handler({path: '/foo'}).should.eventually.equal('foo');
          case 6:
            $ctx.maybeThrow();
            $ctx.state = 8;
            break;
          case 8:
            $ctx.state = 10;
            return handler({path: '/bar/baz/subpath'}).should.eventually.equal('bar');
          case 10:
            $ctx.maybeThrow();
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = 14;
            return handler({path: '/baz'}).should.eventually.equal('default page');
          case 14:
            $ctx.maybeThrow();
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__14, this);
  })));
  it('nested router', async($traceurRuntime.initGeneratorFunction(function $__15() {
    var post,
        defaultPage,
        userRouter,
        mainRouter,
        handler,
        path;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            post = simpleHandler((function(args, input) {
              args.userId.should.equal('john');
              args.postId.should.equal('welcome-to-my-blog');
              input.should.equal('some comment');
              return 'Hello World!';
            }), 'text', 'text');
            defaultPage = simpleHandler((function(args) {
              return 'default page';
            }), 'void', 'text');
            userRouter = makeRouter().paramRoute('/post/:postId', post);
            mainRouter = makeRouter().paramRoute('/user/:userId/:restpath', userRouter).defaultRoute(defaultPage);
            $ctx.state = 18;
            break;
          case 18:
            $ctx.state = 2;
            return loadSimpleHandler({}, mainRouter, 'text', 'text');
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            path = '/user/john/post/welcome-to-my-blog';
            $ctx.state = 20;
            break;
          case 20:
            $ctx.state = 6;
            return handler({path: path}, 'some comment').should.eventually.equal('Hello World!');
          case 6:
            $ctx.maybeThrow();
            $ctx.state = 8;
            break;
          case 8:
            $ctx.state = 10;
            return handler({path: '/user/john/spam'}, 'spam').should.be.rejected;
          case 10:
            $ctx.maybeThrow();
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = 14;
            return handler({path: '/other place'}, 'nothing').should.eventually.equal('default page');
          case 14:
            $ctx.maybeThrow();
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__15, this);
  })));
  it('http router test', async($traceurRuntime.initGeneratorFunction(function $__16() {
    var foo,
        bar,
        baz,
        router,
        $__6,
        streamHandler,
        httpHandler,
        request1,
        $__7,
        response1,
        streamable1,
        request2,
        $__8,
        response2,
        streamable2,
        request3,
        $__9,
        response3,
        streamable3,
        request4,
        $__19,
        $__20,
        $__21,
        $__22,
        $__23,
        $__24,
        $__25,
        $__26,
        $__27,
        $__28,
        $__29,
        $__30,
        $__31,
        $__32,
        $__33,
        $__34,
        $__35,
        $__36,
        $__37,
        $__38;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            foo = createHttpHandler(async($traceurRuntime.initGeneratorFunction(function $__17(requestHead, streamable) {
              return $traceurRuntime.createGeneratorInstance(function($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      requestHead.method.should.equal('GET');
                      requestHead.path.should.equal('/foo/john');
                      requestHead.args.name.should.equal('john');
                      $ctx.state = 4;
                      break;
                    case 4:
                      $ctx.returnValue = [new ResponseHead({statusCode: 202}), textToStreamable('foo')];
                      $ctx.state = -2;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__17, this);
            })));
            bar = createHttpHandler(async($traceurRuntime.initGeneratorFunction(function $__18(requestHead, streamable) {
              return $traceurRuntime.createGeneratorInstance(function($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      requestHead.method.should.equal('POST');
                      requestHead.path.should.equal('/bar');
                      $ctx.state = 8;
                      break;
                    case 8:
                      $ctx.state = 2;
                      return streamableToText(streamable).should.eventually.equal('post content');
                    case 2:
                      $ctx.maybeThrow();
                      $ctx.state = 4;
                      break;
                    case 4:
                      $ctx.returnValue = [new ResponseHead({statusCode: 401}), textToStreamable('Forbidden')];
                      $ctx.state = -2;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__18, this);
            })));
            baz = simpleHandler((function(args, text) {
              args.path.should.equal('/baz');
              text.should.equal('upload');
              return 'baz';
            }), 'text', 'text');
            router = makeRouter().paramRoute('/foo/:name', foo).staticRoute('/bar', bar).staticRoute('/baz', baz);
            $ctx.state = 62;
            break;
          case 62:
            $__19 = router.loadHandleable;
            $__20 = $__19.call(router, {});
            $ctx.state = 6;
            break;
          case 6:
            $ctx.state = 2;
            return $__20;
          case 2:
            $__21 = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $__6 = $__21;
            $__22 = $__6.streamHandler;
            streamHandler = $__22;
            $__23 = $__6.httpHandler;
            httpHandler = $__23;
            $ctx.state = 8;
            break;
          case 8:
            request1 = new RequestHead({url: '/foo/john?a=b'});
            $ctx.state = 64;
            break;
          case 64:
            $__24 = emptyStreamable();
            $__25 = httpHandler(request1, $__24);
            $ctx.state = 14;
            break;
          case 14:
            $ctx.state = 10;
            return $__25;
          case 10:
            $__26 = $ctx.sent;
            $ctx.state = 12;
            break;
          case 12:
            $__7 = $__26;
            $__27 = $__7[0];
            response1 = $__27;
            $__28 = $__7[1];
            streamable1 = $__28;
            $ctx.state = 16;
            break;
          case 16:
            response1.statusCode.should.equal(202);
            $ctx.state = 66;
            break;
          case 66:
            $ctx.state = 18;
            return streamableToText(streamable1).should.eventually.equal('foo');
          case 18:
            $ctx.maybeThrow();
            $ctx.state = 20;
            break;
          case 20:
            request2 = new RequestHead({
              method: 'POST',
              url: '/bar?a=b'
            });
            $ctx.state = 68;
            break;
          case 68:
            $__29 = textToStreamable('post content');
            $__30 = httpHandler(request2, $__29);
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = 22;
            return $__30;
          case 22:
            $__31 = $ctx.sent;
            $ctx.state = 24;
            break;
          case 24:
            $__8 = $__31;
            $__32 = $__8[0];
            response2 = $__32;
            $__33 = $__8[1];
            streamable2 = $__33;
            $ctx.state = 28;
            break;
          case 28:
            response2.statusCode.should.equal(401);
            $ctx.state = 70;
            break;
          case 70:
            $ctx.state = 30;
            return streamableToText(streamable2).should.eventually.equal('Forbidden');
          case 30:
            $ctx.maybeThrow();
            $ctx.state = 32;
            break;
          case 32:
            request3 = new RequestHead({
              method: 'POST',
              url: '/baz?a=b'
            });
            $ctx.state = 72;
            break;
          case 72:
            $__34 = textToStreamable('upload');
            $__35 = httpHandler(request3, $__34);
            $ctx.state = 38;
            break;
          case 38:
            $ctx.state = 34;
            return $__35;
          case 34:
            $__36 = $ctx.sent;
            $ctx.state = 36;
            break;
          case 36:
            $__9 = $__36;
            $__37 = $__9[0];
            response3 = $__37;
            $__38 = $__9[1];
            streamable3 = $__38;
            $ctx.state = 40;
            break;
          case 40:
            response3.statusCode.should.equal(200);
            $ctx.state = 74;
            break;
          case 74:
            $ctx.state = 42;
            return streamableToText(streamable3).should.eventually.equal('baz');
          case 42:
            $ctx.maybeThrow();
            $ctx.state = 44;
            break;
          case 44:
            request4 = new RequestHead({
              method: 'GET',
              url: '/not-exists'
            });
            $ctx.state = 76;
            break;
          case 76:
            $ctx.state = 46;
            return httpHandler(request4, emptyStreamable()).should.be.rejected;
          case 46:
            $ctx.maybeThrow();
            $ctx.state = 48;
            break;
          case 48:
            $ctx.state = 50;
            return streamHandler({path: '/baz'}, textToStreamable('upload')).then(streamableToText).should.eventually.equal('baz');
          case 50:
            $ctx.maybeThrow();
            $ctx.state = 52;
            break;
          case 52:
            $ctx.state = 54;
            return streamHandler({path: '/foo/john'}, emptyStreamable()).should.be.rejected;
          case 54:
            $ctx.maybeThrow();
            $ctx.state = 56;
            break;
          case 56:
            $ctx.state = 58;
            return streamHandler({path: '/bar'}, emptyStreamable()).should.be.rejected;
          case 58:
            $ctx.maybeThrow();
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__16, this);
  })));
  it('method router test 1', async($traceurRuntime.initGeneratorFunction(function $__17() {
    var foo,
        router,
        handler,
        $__6,
        responseHead,
        responseStreamable,
        $__7,
        $__39,
        $__40,
        $__41,
        $__42,
        $__43,
        $__44,
        $__45,
        $__46,
        $__47,
        $__48,
        $__49,
        $__50;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            foo = simpleHandler((function(args) {
              return 'foo';
            }), 'void', 'text');
            router = methodRouter({get: foo});
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = 2;
            return loadHttpHandler({}, router);
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $__39 = new RequestHead({method: 'GET'});
            $__40 = emptyStreamable();
            $__41 = handler($__39, $__40);
            $ctx.state = 10;
            break;
          case 10:
            $ctx.state = 6;
            return $__41;
          case 6:
            $__42 = $ctx.sent;
            $ctx.state = 8;
            break;
          case 8:
            $__6 = $__42;
            $__43 = $__6[0];
            responseHead = $__43;
            $__44 = $__6[1];
            responseStreamable = $__44;
            $ctx.state = 12;
            break;
          case 12:
            responseHead.statusCode.should.equal(200);
            $ctx.state = 28;
            break;
          case 28:
            $ctx.state = 14;
            return streamableToText(responseStreamable).should.eventually.equal('foo');
          case 14:
            $ctx.maybeThrow();
            $ctx.state = 16;
            break;
          case 16:
            $__45 = new RequestHead({method: 'POST'});
            $__46 = emptyStreamable();
            $__47 = handler($__45, $__46);
            $ctx.state = 22;
            break;
          case 22:
            $ctx.state = 18;
            return $__47;
          case 18:
            $__48 = $ctx.sent;
            $ctx.state = 20;
            break;
          case 20:
            $__7 = $__48;
            $__49 = $__7[0];
            responseHead = $__49;
            $__50 = $__7[1];
            responseStreamable = $__50;
            $ctx.state = 24;
            break;
          case 24:
            responseHead.statusCode.should.equal(405);
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__17, this);
  })));
  it('method router test 2', async($traceurRuntime.initGeneratorFunction(function $__18() {
    var foo,
        bar,
        router,
        handler,
        $__6,
        responseHead,
        responseStreamable,
        $__7,
        $__8,
        $__9,
        $__10,
        $__51,
        $__52,
        $__53,
        $__54,
        $__55,
        $__56,
        $__57,
        $__58,
        $__59,
        $__60,
        $__61,
        $__62,
        $__63,
        $__64,
        $__65,
        $__66,
        $__67,
        $__68,
        $__69,
        $__70,
        $__71,
        $__72,
        $__73,
        $__74,
        $__75,
        $__76,
        $__77,
        $__78,
        $__79,
        $__80;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            foo = simpleHandler((function(args) {
              return 'foo';
            }), 'void', 'text');
            bar = simpleHandler((function(args) {
              return 'bar';
            }), 'void', 'text');
            router = makeRouter().staticRoute('/', {
              get: foo,
              post: bar
            });
            $ctx.state = 58;
            break;
          case 58:
            $ctx.state = 2;
            return loadHttpHandler({}, router);
          case 2:
            handler = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $__51 = new RequestHead({
              method: 'GET',
              url: '/'
            });
            $__52 = emptyStreamable();
            $__53 = handler($__51, $__52);
            $ctx.state = 10;
            break;
          case 10:
            $ctx.state = 6;
            return $__53;
          case 6:
            $__54 = $ctx.sent;
            $ctx.state = 8;
            break;
          case 8:
            $__6 = $__54;
            $__55 = $__6[0];
            responseHead = $__55;
            $__56 = $__6[1];
            responseStreamable = $__56;
            $ctx.state = 12;
            break;
          case 12:
            responseHead.statusCode.should.equal(200);
            $ctx.state = 60;
            break;
          case 60:
            $ctx.state = 14;
            return streamableToText(responseStreamable).should.eventually.equal('foo');
          case 14:
            $ctx.maybeThrow();
            $ctx.state = 16;
            break;
          case 16:
            $__57 = new RequestHead({
              method: 'POST',
              url: '/'
            });
            $__58 = emptyStreamable();
            $__59 = handler($__57, $__58);
            $ctx.state = 22;
            break;
          case 22:
            $ctx.state = 18;
            return $__59;
          case 18:
            $__60 = $ctx.sent;
            $ctx.state = 20;
            break;
          case 20:
            $__7 = $__60;
            $__61 = $__7[0];
            responseHead = $__61;
            $__62 = $__7[1];
            responseStreamable = $__62;
            $ctx.state = 24;
            break;
          case 24:
            responseHead.statusCode.should.equal(200);
            $ctx.state = 62;
            break;
          case 62:
            $ctx.state = 26;
            return streamableToText(responseStreamable).should.eventually.equal('bar');
          case 26:
            $ctx.maybeThrow();
            $ctx.state = 28;
            break;
          case 28:
            $__63 = new RequestHead({
              method: 'HEAD',
              url: '/'
            });
            $__64 = emptyStreamable();
            $__65 = handler($__63, $__64);
            $ctx.state = 34;
            break;
          case 34:
            $ctx.state = 30;
            return $__65;
          case 30:
            $__66 = $ctx.sent;
            $ctx.state = 32;
            break;
          case 32:
            $__8 = $__66;
            $__67 = $__8[0];
            responseHead = $__67;
            $__68 = $__8[1];
            responseStreamable = $__68;
            $ctx.state = 36;
            break;
          case 36:
            responseHead.statusCode.should.equal(200);
            $ctx.state = 64;
            break;
          case 64:
            $ctx.state = 38;
            return streamableToText(responseStreamable).should.eventually.equal('');
          case 38:
            $ctx.maybeThrow();
            $ctx.state = 40;
            break;
          case 40:
            $__69 = new RequestHead({method: 'PUT'});
            $__70 = emptyStreamable();
            $__71 = handler($__69, $__70);
            $ctx.state = 46;
            break;
          case 46:
            $ctx.state = 42;
            return $__71;
          case 42:
            $__72 = $ctx.sent;
            $ctx.state = 44;
            break;
          case 44:
            $__9 = $__72;
            $__73 = $__9[0];
            responseHead = $__73;
            $__74 = $__9[1];
            responseStreamable = $__74;
            $ctx.state = 48;
            break;
          case 48:
            responseHead.statusCode.should.equal(405);
            $ctx.state = 66;
            break;
          case 66:
            $__75 = new RequestHead({method: 'OPTIONS'});
            $__76 = emptyStreamable();
            $__77 = handler($__75, $__76);
            $ctx.state = 54;
            break;
          case 54:
            $ctx.state = 50;
            return $__77;
          case 50:
            $__78 = $ctx.sent;
            $ctx.state = 52;
            break;
          case 52:
            $__10 = $__78;
            $__79 = $__10[0];
            responseHead = $__79;
            $__80 = $__10[1];
            responseStreamable = $__80;
            $ctx.state = 56;
            break;
          case 56:
            responseHead.statusCode.should.equal(200);
            responseHead.getHeader('allow').should.equal('GET, POST, HEAD, OPTIONS');
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__18, this);
  })));
}));
