const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const express = require("express");
const url = require("url");
const queryString = require("querystring");
const path = require("path");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require("multer");
//const expressStatic = require("express-static");
var sqlpool = require("sqlpool.js");

var objmulter = multer({ dest: './public/img/' });

var server = express(); //建立请求
server.listen(8100);
server.use(objmulter.any());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/view', (req, res) => {
    var obj = './view' + url.parse(req.url).pathname;
    fs.readFile(obj, (err, data) => {
        if (err) {
            console.log(err);
            res.write('adress error');
        } else {
            res.write(data);
        }
        res.end();
    })

});


server.post('/api/login', (req, res) => { //登录接口
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
    });
    req.on('end', function() {
        var post = queryString.parse(str);
        console.log("./api/login接口post访问数据：", post);
        sqlpool.func(function(connect) {
            connect.query("select * from login where username=? and password=?", [post.username, post.password], function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                console.log("kkkkkkkk", result);
                if (err) {
                    console.log(err);
                    obj = {
                            'status': 'false',
                            'msg': err,
                        }
                        //return callback(err);
                }
                if (result.length === 0) {
                    obj = {
                        'status': 'false',
                        'msg': "密码或账号不正确",
                    }
                } else {
                    obj = {
                        'status': 'true',
                        'msg': "接口请求成功",
                        'root': result[0].rooter,
                        'username': result[0].username
                    }
                }
                obj = JSON.stringify(obj);
                console.log('访问结果：', obj);
                res.send(obj);
                res.end();
            });

        });
    });


});
server.post('/api/get', (req, res) => { //get方法
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
        //console.log(11, data);
    });
    req.on("end", function() {
            var post = queryString.parse(str);
            console.log(post);
            if (post.api == "all") {
                sql = "select * from video order by id desc";
                arry = [];
            }
            if (post.api == "one") {
                sql = "select * from video where name=?";
                arry = [post.videoname];
            }
            sqlpool.func(function(connect) {
                connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                    if (err) {
                        console.log(err);
                        obj = {
                            'status': 'false',
                            'msg': err,
                        }
                    } else {
                        obj = {
                            'status': 'true',
                            'msg': "接口请求成功",
                            'length': result.length,
                            'data': result
                        }

                    }
                    console.log(obj);
                    obj = JSON.stringify(obj);
                    res.send(obj);
                    res.end();
                });

            });
        })
        //sqlpool.func("select * from login;");
        //sqlpool.func("insert into login (user,pass) values (?,?);", [req.query.username, req.query.password]);

});
server.post('/get/plan', (req, res) => { //get方法
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
        //console.log(11, data);
    });
    req.on("end", function() {
            var post = queryString.parse(str);
            console.log(post);

            if (post.api == "plan") {
                sql = "select * from plan where name=?";
                arry = [post.videoname];
            }
            if (post.api == "buy") {
                sql = "select * from plan where id=?";
                arry = [post.id];
            }
            sqlpool.func(function(connect) {
                connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                    if (err) {
                        console.log(err);
                        obj = {
                            'status': 'false',
                            'msg': err,
                        }
                    } else {
                        obj = {
                            'status': 'true',
                            'msg': "接口请求成功",
                            'length': result.length,
                            'data': result
                        }

                    }
                    console.log(obj);
                    obj = JSON.stringify(obj);
                    res.send(obj);
                    res.end();
                });

            });
        })
        //sqlpool.func("select * from login;");
        //sqlpool.func("insert into login (user,pass) values (?,?);", [req.query.username, req.query.password]);

});

server.post('/post/add', (req, res) => { //添加数据接口
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
    });
    req.on("end", function() {
        var post = queryString.parse(str);
        if (post.api === "house") {
            var sql = "insert into house(housename,seatnum,seat) values (?,?,?)";
            var arry = [post.housename, post.seatnum, post.seat];
        } else if (post.api === "user") {
            var sql = "insert into login(username,password,rooter) values (?,?,?)";
            var arry = [post.username, post.password, post.rooter];
        }
        sqlpool.func(function(connect) {
            connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                if (err) {
                    console.log(err);
                    obj = {
                        'status': 'false',
                        'msg': err,
                    }
                } else {
                    obj = {
                        'status': 'true',
                        'msg': "接口请求成功",
                        'length': result.length,
                        'data': result
                    }

                }
                obj = JSON.stringify(obj);
                res.send(obj);
                res.end();
            });

        });
    });
});

server.post('/upload/img', (req, res) => { //上传文件接口
    console.log(req.body, req.files);
    var newname = req.files[0].path + path.parse(req.files[0].originalname).ext;
    var imgname = req.files[0].filename + path.parse(req.files[0].originalname).ext;
    console.log("kkkk", req.files[0].path, newname);
    var sql = "insert into video(name,time,type,actor,director,brief,img) values (?,?,?,?,?,?,?);";
    var arry = [req.body.name, req.body.time, req.body.type, req.body.actor, req.body.director, req.body.brief, imgname];
    fs.rename(req.files[0].path, newname, function(err) {
        if (err) {
            res.send("失败");
        } else {
            sqlpool.func(function(connect) {
                connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                    if (err) {
                        console.log(err);
                        obj = {
                            'status': 'false',
                            'msg': err,
                        }
                    } else {
                        obj = {
                            'status': 'true',
                            'msg': "接口请求成功",
                            'length': result.length,
                            'data': result
                        }
                    }
                    obj = JSON.stringify(obj);
                    console.log(obj);
                });
            });
            fs.readFile('./view/addvideo.html', (err, data) => {
                if (err) {
                    res.write("失败");
                } else {
                    res.write(data);
                }
            });
        }
    });
});
server.get('/get/message', (req, res) => { //获取数据接口
    var obj = {};
    var api = req.query.api;
    if (api === "user") {
        var sql = "select * from login;";
    } else if (api === "video") {
        var sql = "select * from video;";
    } else if (api === "house") {
        var sql = "select * from house;";
    } else if (api === "plan") {
        var sql = "select * from plan";
    }

    sqlpool.func(function(connect) {
        connect.query(sql, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
            if (err) {
                console.log(err);
                obj = {
                    'code': 0,
                    'msg': "数据请求失败",
                    'count': result.length,
                    'data': result,
                }
            } else {
                obj = {
                    'code': 0,
                    'msg': "接口请求成功",
                    'length': result.length,
                    'data': result
                }
            }
            obj = JSON.stringify(obj);
            res.send(obj);
            res.end();
        });
    });
});
server.post('/del/message', (req, res) => { //删除接口
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
    });
    req.on('end', function() {
        var post = queryString.parse(str);
        var api = req.query.api;
        if (api === "user") {
            var sql = "delete from login where id= ?";
            var arry = [post.id];
        } else if (api === "video") {
            var sql = "delete from video where id= ?";
            var arry = [post.id];
            sqlpool.func(function(connect) {
                console.log(post);
                connect.query("delete from plan where name = ?", [post.name], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                })
                fs.unlink('./public/img/' + post.img, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("删除《" + post.name + "》图片");
                });
            });
        } else if (api === "house") {
            var sql = "delete from house where id= ?";
            var arry = [post.id];
            sqlpool.func(function(connect) {
                console.log("llllll", post);
                connect.query("delete from plan where house = ?", [post.housename], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                })
            });

        } else if (api === "plan") {
            var sql = "delete from plan where id= ?";
            var arry = [post.id];
        }
        sqlpool.func(function(connect) {
            connect.query(sql, arry, (err, result) => {
                if (err) {
                    console.log(err);
                    obj = {
                        'msg': "删除失败",
                        'status': 'false'
                    }
                } else {
                    obj = {
                        'msg': "删除成功",
                        'status': 'true'
                    }

                }
                obj = JSON.stringify(obj);
                res.send(obj);
                res.end();
            });
        });
    });
});
server.post('/and/add', (req, res) => { //合并查询添加数据接口
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
    });
    req.on("end", function() {
        var post = queryString.parse(str);
        if (post.api === "plan") {
            sqlpool.func(function(connect) {
                connect.query("select * from house where housename=?", [post.house], function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                    if (err) {
                        console.log(err);
                    } else if (result.length == 0) {
                        obj = {
                            'status': 'false',
                            'msg': '查无此演出厅',
                        }
                        obj = JSON.stringify(obj);
                        res.send(obj);
                        res.end();
                    } else {
                        sqlpool.func(function(connect) {
                            connect.query("select * from video where name=?", [post.name], (error, resu) => {
                                if (error) {
                                    console.log(error);
                                } else if (resu.length == 0) {
                                    obj = {
                                        'status': 'false',
                                        'msg': '查无此剧目',
                                    }
                                    obj = JSON.stringify(obj);
                                    res.send(obj);
                                    res.end();
                                } else {
                                    sqlpool.func(function(connect) {
                                        connect.query("select * from plan where house=? and time=? and number=?", [post.house, post.time, post.number], (error, resu) => {
                                            if (error) {
                                                console.log(error);
                                            } else if (resu.length != 0) {
                                                obj = {
                                                    'status': 'false',
                                                    'msg': '此时间段已存在演出计划',
                                                }
                                                obj = JSON.stringify(obj);
                                                res.send(obj);
                                                res.end();
                                            } else {
                                                var sql = "insert into plan (name,house,time,number,price,seat) values (?,?,?,?,?,?)";
                                                var arry = [post.name, post.house, post.time, post.number, post.price, result[0].seat];
                                                sqlpool.func(function(connect) {
                                                    connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                                                        if (err) {
                                                            console.log(err);
                                                            obj = {
                                                                'status': 'false',
                                                                'msg': err,
                                                            }
                                                        } else {

                                                            obj = {
                                                                'status': 'true',
                                                                'msg': '成功',
                                                            }
                                                        }
                                                        obj = JSON.stringify(obj);
                                                        res.send(obj);
                                                        res.end();
                                                    });

                                                });
                                            }
                                        });
                                    });

                                }
                            });
                        });

                    }




                });
            });

        }
        /* 
         */
    });
});
server.post('/update/plan', (req, res) => { //get方法
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
        //console.log(11, data);
    });
    req.on("end", function() {
        var post = queryString.parse(str);
        console.log(post);

        sqlpool.func(function(connect) {
            connect.query("insert into orders(username,videoname,house,time,number,seat,ticket,price,money) values (?,?,?,?,?,?,?,?,?)", [post.username, post.videoname, post.house, post.time, post.number, post.orderseat, post.ticket, post.price, post.money], function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                if (err) {
                    console.log(err);
                    obj = {
                        'status': 'false',
                        'msg': "购票失败"
                    }
                    console.log(obj);
                    obj = JSON.stringify(obj);
                    res.send(obj);
                    res.end();
                } else {
                    console.log(1);
                    sqlpool.func(function(connect) {
                        connect.query("update plan set seat=? where id=?", [post.planseat, post.id], function(err, result) {
                            if (err) {
                                console.log(err);
                                obj = {
                                    'status': 'false',
                                    'msg': "购票失败"
                                }
                                console.log(obj);
                                obj = JSON.stringify(obj);
                                res.send(obj);
                                res.end();
                            } else {
                                obj = {
                                    'status': 'true',
                                    'msg': "购票成功"
                                }
                                console.log(obj);
                                obj = JSON.stringify(obj);
                                res.send(obj);
                                res.end();

                            }

                        });
                    });
                }

            });

        });

    })
});
server.get('/get/orders', (req, res) => { //添加数据接口
    var str = "";
    var post = req.query;
    if (post.statu == 1) {
        var sql = "select * from orders where username=?";
        var arry = [post.api];
    } else if (post.statu == 2) {
        var sql = "select * from orders";
        var arry = [];
    }
    sqlpool.func(function(connect) {
        connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
            if (err) {
                console.log(err);
                obj = {
                    'code': 0,
                    'msg': "接口请求失败",
                    'length': result.length,
                    'data': result
                }
            } else {
                obj = {
                    'code': 0,
                    'msg': "接口请求成功",
                    'length': result.length,
                    'data': result
                }

            }
            obj = JSON.stringify(obj);
            res.send(obj);
            res.end();
        });

    });
});
server.post('/find/orders', (req, res) => { //添加数据接口
    var str = "";
    var obj = {};
    req.on("data", function(data) {
        str += data;
    });
    req.on("end", function() {
        var post = queryString.parse(str);
        if (post.api === "videoname") {
            var sql = "SELECT SUM(money) as num FROM orders where videoname=?";
            var arry = [post.videoname];
        } else if (post.api === "house") {
            var sql = "SELECT SUM(money) as num FROM orders where house=?";
            var arry = [post.house];
        } else if (post.api === "username") {
            var sql = "SELECT SUM(money) as num FROM orders where username=?";
            var arry = [post.username];
        } else if (post.api === "time") {
            var sql = "SELECT SUM(money) as num FROM orders where time=?";
            var arry = [post.time];
        }
        sqlpool.func(function(connect) {
            connect.query(sql, arry, function(err, result) { //connection.query(mysql的语句, 可能的参数, 回调函数);
                if (err) {
                    console.log(err);
                    obj = {
                        'status': 'false',
                        'msg': err,
                    }
                } else {
                    obj = {
                        'status': 'true',
                        'msg': "接口请求成功",
                        'data': result
                    }

                }
                console.log(obj);
                obj = JSON.stringify(obj);
                res.send(obj);
                res.end();
            });

        });
    });
});