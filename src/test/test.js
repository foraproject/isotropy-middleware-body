import __polyfill from "babel-polyfill";
import request from "supertest";
import http from "http";
import should from "should";
import parse from "../isotropy-middleware-body";

describe('Isotropy Parse Url', () => {

  it('should parse form', () => {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        parse(req).then(() => {
          req.body.foo.bar.should.equal('baz');
          res.end();
          resolve();
        })
        .catch((err) => reject(err));
      });

      return request(server)
        .post('/')
        .type('form')
        .send({ foo: { bar: 'baz' }})
        .end();
    });
  });

  it('should parse json', function() {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        parse(req).then(() => {
          req.body.should.eql({ foo: 'bar' });
          res.end();
          resolve();
        })
        .catch((err) => reject(err));
      });

      return request(server)
      .post('/')
      .send({ foo: 'bar' })
      .end();
    });
  });

  it('should parse text', function() {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        parse(req).then(() => {
          req.body.should.eql('hello world');
          res.end();
          resolve();
        })
        .catch((err) => reject(err));
      });

      return request(server)
      .post('/')
      .set('content-type', 'text/plain')
      .send('hello world')
      .end();
    });
  });


  it('should be empty if there is an error', function() {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        parse(req).then(() => {
          req.body.should.deepEqual({});
          res.end();
          resolve();
        })
        .catch((err) => reject(err));
      });

      return request(server)
      .post('/')
      .set('content-type', 'invalid/type')
      .send('hello world')
      .end();
    });
  });

});
