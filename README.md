1. yarn start

#### 선결조건) .router/index 의 '/sampleData' 를 호출하여 로컬 몽고디비에 게시물 데이터 10개 댓글 데이터 10000개를 여러 컬렉션( post, review, index_post, index_review, de_post) 에 삽입

'/join'을 호출하여 위에서 삽입 된 데이터를 db level에서 join을 100번 한것은 평균 시간 도출 => 7.6ms

'/joinIndex'을 호출하여 위에서 삽입 된 인덱싱 처리된 데이터를 db level에서 join을 100번 한것은 평균 시간 도출 => 3.9ms

'/joinInapp'을 호출하여 위에서 삽입 된 데이터를 application level에서 join을 100번 한것은 평균 시간 도출 => 20.279ms

'/joinInappIndex'을 호출하여 위에서 삽입 된 인덱싱 처리된 데이터를 application level에서 join을 100번 한것은 평균 시간 도출 => 15.807ms

'/denormalization'을 호출하여 위에서 삽입 된 데이터를 을 100번 한것은 평균 시간 도출 => 0.429ms

이 repository의 목적은 application level의 join(심플쿼리를 이용한 서버내에서의 후가공) 과 db level의 join($lookup)의 퍼포먼스 체크를 위함입니다.

#### 제가 공부한바론 몽고디비에서 권장하는것이 비정규화와 application level에서 join을 하는것이라고 알고있습니다.

#### 그 이유론 application level에서 join 하는 것과 db level에서 join하는 방식이 거의 같기때문에 병목자원인 디비쪽의 연산을 최대한 줄이기 위함이라고 이해하였습니다.

#### 도출된 결과를 본다면 db level의 join을 사용해야하며 이미 서술하여듯이 방식이 거의 같기때문에 퍼포먼스 차이도 이렇게 크게 나면 안될것같은데

#### 제가 알고있는 개념 자체가 틀린것인지 테스트에서 놓친것이 있는지 궁금합니다.