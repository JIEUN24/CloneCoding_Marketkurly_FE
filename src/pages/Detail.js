import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewList from "./ReviewList";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

const DetailItem = (props) => {

  const dispatch = useDispatch();
  const params = useParams();

  // itemId는 useParams를 이용하여 Url에서 떼어온 값
  const itemId = params.itemId;

  // 리덕스에 저장된 상세페이지 리스트 로드
  const detail_post = useSelector((state) => state.post.detail_post);

  React.useEffect(() => {
    // 각각의 상세페이지 로드시 itemId 값에 맞는 상세페이지 로드
    dispatch(postActions.getDetailAC(itemId));
  }, []);

  return (
    <React.Fragment>
      <SectionView>
        <ImgWrap>
          {/* item.image */}
          <img style={{width: "416px", height: "538"}} src={detail_post.image}></img>
          <TitleWrap>
            {/* item.title */}
            <Name>{detail_post.title}</Name>
            {/* item.des */}
            <Short>{detail_post.des}</Short>
            <Price>{detail_post.price}원</Price>

            <InfoWrap>
              <dl className="list">
                <dt className="tit">판매단위</dt>
                <dd className="desc">1개</dd>
              </dl>
              <dl className="list">
                {/* item.weight */}
                <dt className="tit">중량/용량</dt>
                <dd className="desc">{detail_post.weight}</dd>
              </dl>
              <dl className="list">
                <dt className="tit">배송구분</dt>
                <dd className="desc">샛별배송/택배배송</dd>
              </dl>
              <dl className="list">
                {/* item.delivery */}
                <dt className="tit">포장타입</dt>
                <dd className="desc">{detail_post.delivery}</dd>
              </dl>
              <dl className="list">
                <dt className="tit">알레르기정보</dt>
                <dd className="desc">
                  닭고기,대두,밀,쇠고기,우유,토마토,조개류(굴),함유
                </dd>
              </dl>
              <dl className="list">
                <dt className="tit">안내사항</dt>
                <dd className="desc">
                 {detail_post.promise}
                </dd>
              </dl>
            </InfoWrap>
          </TitleWrap>

          <BoxSelect>
            <span>구매수량</span>
            <Option>
              <span className="count">
                <button
                  className="down btn"
                  // onClick={downCount}
                  // disabled={count < 2}
                ></button>
                <input className="inp" />
                {/* </span>onChange={value} value={count}> */}

                <button className="up btn" />
                {/* onClick={upCount}></button> */}
              </span>
            </Option>
          </BoxSelect>
        </ImgWrap>

        <Total>
          <div className="price">
            <strong>총 상품금액 :</strong>
            <span className="num">11,900</span>
            {/* 금액 " , " 를 사용 : toLocalString() 사용 -> 주의점 : Number.prototype.toLocaleString() 이기때문에 꼭 Number()로 타입변경  */}
            <span className="won">원</span>
          </div>
        </Total>

        <BtnWrap>
          <button className="btn">장바구니 담기</button>
        </BtnWrap>

        <div style={{
          display: "flex",
          flexDirection: "colum",
          justifyContent: "center",
          width: "1000px",
          height: "50px",
          fontSize: "30px",
        }}>
          중간 미들 헤더 들어갈 자리
        </div>

        <div style={{
          display: "flex",
          flexDirection: "colum",
          justifyContent: "center",
          width: "1000px",
        }}>
          <img style={{width: "100%"}} src={detail_post.detail_Image} />
        </div>
      </SectionView>

      {/* 리뷰리스트 컴포넌트에 itemId를 props로 넘기기 */}
      <ReviewList itemId={itemId} />
    </React.Fragment>
  );
};

const SectionView = styled.div`
  width: 1050px;
  margin: 0 auto;
  padding-top: 20px;
  margin-bottom: 50px;
`;
const ImgWrap = styled.div`
  float: left;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TitleWrap = styled.div`
  float: right;
  width: 560px;
`;
const Name = styled.strong`
  display: block;
  padding-right: 60px;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  word-break: break-all;
`;

const Short = styled.span`
  display: block;
  padding: 4px 60px 0 0;
  font-size: 14px;
  color: #999;
  line-height: 20px;
  word-break: break-all;
`;
const Price = styled.span`
  font-weight: 700;
  font-size: 28px;
  line-height: 30px;
  letter-spacing: 0;
  font-family: noto sans;
  color: #333;
  & span {
    padding: 0 7px 0 2px;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    vertical-align: 2px;
    letter-spacing: 0;
  }
`;
const InfoWrap = styled.div`
  float: right;
  width: 560px;
  margin-top: 19px;
  padding-bottom: 25px;
  border-top: 1px solid #f4f4f4;
  .list {
    overflow: hidden;
    padding: 13px 0;
    border-bottom: 1px solid #f4f4f4;
  }
  .tit {
    float: left;
    width: 128px;
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }
  .desc {
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
  }
`;

const BoxSelect = styled.div`
  float: right;
  width: 560px;
  margin-top: -1px;
  padding-bottom: 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  .strong {
    float: left;
    width: 128px;
    padding-top: 9px;
    font-weight: 400;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    letter-spacing: -0.5px;
  }
  .a {
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 9px 0 9px 15px;
    border-top: 1px solid #f4f4f4;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.3px;
  }
`;

const Option = styled.div`
  margin-left: 65px;
  padding-top: 0;
  overflow: hidden;
  .count {
    overflow: hidden;
    float: left;
    width: 88px;
    height: 30px;
    border: 1px solid #dddfe1;
    border-radius: 3px;
  }
  .down {
    background: #fff url("https://res.kurly.com/pc/ico/2010/ico_minus_on.svg")
      no-repeat 50% 50%;
    width: 30px;
    outline: none;
  }
  .btn {
    overflow: hidden;
    float: left;
    width: 28px;
    height: 28px;
    border: 0;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  .inp {
    float: left;
    width: 30px;
    height: 30px;
    margin-right: -1px;
    padding: 0 0 4px;
    border: 0;
    background-color: #fff;
    font-size: 14px;
    color: #000;
    line-height: 18px;
    text-align: center;
    outline: none;
  }
  .up {
    float: right;
    margin-left: -1px;
    background: url("https://res.kurly.com/pc/ico/2010/ico_plus_on.svg")
      no-repeat 50% 50%;
    background-size: 30px 30px;
  }
`;

const Total = styled.div`
  display: block;
  float: right;
  padding: 30px 0 20px;
  border-top: 1px solid #f4f4f4;
  .price {
    overflow: hidden;
    text-align: right;
  }
  .strong {
    font-weight: 700;
    font-size: 13px;
    line-height: 20px;
    vertical-align: 2px;
  }
  .num {
    padding-left: 8px;
    font-weight: 800;
    font-size: 32px;
    line-height: 32px;
  }
  .won {
    padding-left: 2px;
    font-size: 20px;
    font-weight: 700;
    line-height: 20px;
    vertical-align: -1px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  padding: 30px 0 20px;
  .btn {
    width: 432px;
    height: 56px;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    color: #fff;
    background-color: #5f0081;
    border: 1px solid #5f0081;
    cursor: pointer;
  }
`;
const PriceWrap = styled.div`
  float: right;
  width: 560px;
  padding: 10px 0 29px;
  display: block;
  padding-top: 4px;
`;
const Disconunt = styled.span`
  font-weight: 700;
  font-size: 28px;
  color: #fa622f;
  line-height: 30px;
  letter-spacing: 0;
  margin-left: 5px;
`;

const Original = styled.span`
  display: block;
  font-size: 16px;
  color: #999;
  line-height: 24px;
  text-decoration: line-through;
`;

export default DetailItem;
