//개발환경이 로컬이냐, 프로덕션 모드냐에 따라 앱을 다르게 설정하는 곳
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}