function ExamDecorator(cl) {
  console.log('==============');
  console.log(cl);  //클래스
  console.log('==============');
}

@ExamDecorator
class AppController {}
