import React, { useState } from "react";
import { Text } from "../elements/Index";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 리덕스 관련
import { history } from "../redux/configureStore"
import { useDispatch, useSelector } from "react-redux";


import { actionCreators as reviewActions } from "../redux/modules/post";

const ReviewWrite = () => {
  const dispatch = useDispatch();
  const detail_post = useSelector((state) => state.post.detail_post);
  // console.log("write 페이지", detail_post)
  const initalValue = detail_post.comments
  // console.log("초기값", initalValue)

  // params의 itemId와 commentId를 가지고 온다.
  const params = useParams();
  const itemId = params.itemId;
  const commentId = params.commentId;
  // console.log("파람스 코멘트아이디", commentId)
  
  // 수정을 알 수 있는 방법
  const is_edit = commentId ? true : false; 
  // console.log("이즈에딧", is_edit)

  // 여기서 발생한 문제
  // 서버에서 받아온 제이슨 형식의 데이타 안의 commentId는 보기엔 숫자이지만 숫자형식이 아니었다.
  // 그래서 형식까지 맞춘 것을 찾으려 하니 계속 undefined가 나와서 형식 비교를 없애주니 제대로 나왔다.
  let _review = is_edit ? initalValue.find((p) => p.commentId == commentId) : null;
  // console.log("제발 코멘트 가져와조..", _review)


  const [title, setTitle] = useState(_review ? _review.title : "");
  const [comment, setComment] = useState(_review ? _review.comment : "");
  const [image, setImage] = useState("선택한 파일X")
  
  const addReview = () => {
    if(title === "" || comment === "") {
      window.alert("내용을 모두 작성해주세요.")
      return;
    }
    // 리뷰를 추가할 때 addReviewAc로 itemId, title, comment를 넘긴다.
    dispatch(reviewActions.addReviewAC(
      itemId,
      title,
      comment,
    ))
    // history.replace(`/detail/${itemId}`)
  }

  const editReview = () => {
    dispatch(reviewActions.editReviewAC(
      itemId,
      commentId,
      title,
      comment,
    ))
  };
   return (
    <React.Fragment>
      <CommentContainer>
        <ReviewTitle>후기 작성</ReviewTitle>
        <Info>작성 시 유의 사항</Info>
        <Line />
        <ImagWrap>
          <ProductImg><img style={{width: "145px"}} src={detail_post.image}/></ProductImg>
          <ProductDesc>{detail_post.title}</ProductDesc>
        </ImagWrap>
        <WriteWrap>
          <TitleWrap>
            <CommentTitle style={{ height: "50px" }}>제목</CommentTitle>
            <CommentTitleBorder1>
              <CommentTitleInput 
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  // console.log(title)
                }}
                placeholder="제목을 입력해주세요." />
            </CommentTitleBorder1>
          </TitleWrap>
          <CommentTextWrap>
            <CommentTextTitle style={{ height: "272px" }}>
              후기작성
            </CommentTextTitle>
            <CommentTitleBorder2>
              <CommentTextInput
                defaultValue={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                  // console.log(comment)
                }}
                placeholder=" 자세한 후기는 다른 고객의 구매에 많은 도움이 되며,
          일반식품의 효능이나 효과 등에 오해의 소지가 있는 내용을 작성 시 검토 후 비공개 조치될 수 있습니다. 
          반품/환불 문의는 1:1문의로 가능합니다. 메롱"
              />
            </CommentTitleBorder2>
            <CommentTitleBorder3 />
          </CommentTextWrap>

          <CommentPhotoWrap>
            <CommentPhotoTitle style={{ height: "150px" }}>
              사진등록
            </CommentPhotoTitle>

            <PhotoUpload>
              <label>
                <img
                  src="https://res.kurly.com/pc/ico/1806/img_add_thumb_x2.png"
                  style={{
                    width: "20px",
                    marginTop: "33px",
                    color: "#e2e2e2",
                  }}
                />
                <input type="file" />
              </label>
            </PhotoUpload>

            <PhotoDesc>
              구매한 상품이 아니거나 캡쳐 사진을 첨부할 경우, 통보없이 삭제 및
              적립 헤택이 취소됩니다.
              <CommentTitleBorder4 />
            </PhotoDesc>
          </CommentPhotoWrap>
          <div
            className="detail-image"
            style={{ padding: "20px 0", textAlign: "center" }}
          >
            <img style={{ width: "50%" }} />
          </div>
        </WriteWrap>

        <Issue>
          혹시 상품에 문제가 있으셨나요?
          <IssueSpan>1:1 문의하기</IssueSpan>
        </Issue>
        
        {is_edit ?
          <Button>
          <Text
            onClick={editReview} 
            color="#ffffff"
            size="16.5px"
            margin="1px 0 0 0">
            수정하기
          </Text>
        </Button>
        :
        <Button>
          <Text
            onClick={addReview} 
            color="#ffffff"
            size="16.5px"
            margin="1px 0 0 0">
            등록하기
          </Text>
        </Button>

        }
        
      </CommentContainer>
    </React.Fragment>
  );
};

const ReviewTitle = styled.div`
  height: 36px;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #333;
  letter-spacing: -0.5px;
  display: flex;
  margin-left: 28px;
`;

const TitleWrap = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  align-content: center;
`;

const WriteWrap = styled.div`
  width: 820px;
`;

const Info = styled.span`
  display: flex;
  justify-content: center;
  margin-left: 700px;
  top: -30px;
  padding-right: -20px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #949296;
  line-height: 20px;
  background: url(https://res.kurly.com/pc/ico/1806/ico_question.png) no-repeat
    97% 5px;
`;

const Line = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background-color: #5f0081;
  margin-top: -2px;
`;

const ImagWrap = styled.div`
  width: 790px;
  height: 190px;
  overflow: hidden;
  padding: 20px 15px;
  /* background-color: pink; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

const ProductImg = styled.div`
  width: 300px;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: yellow; */
`;

const ProductDesc = styled.div`
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: -170px;

  font-size: 20px;
  color: #000;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: 0.01em;
  /* background-color: green; */
  width: 650px;
`;

const CommentTitleWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentTitleBorder1 = styled.div`
  border-top: 1px solid #dddfe1;
  padding: 8px 1px 10px 10px;
  width: 710px;
  display: flex;
`;

const CommentTitleBorder2 = styled.div`
  border-top: 1px solid #dddfe1;
  padding: 10px 0px 10px 10px;
  width: 660px;
  display: flex;
  margin-top: 130px;
`;

const CommentTitleBorder3 = styled.div`
  border-top: 1px solid #dddfe1;
  padding: 10px 0px 10px 10px;
  width: 670px;
  display: flex;
  margin-top: 331px;
  margin-left: -670px;
`;

const CommentTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 100%;
  border-top: 1px solid #dddfe1;
  background-color: #f7f7f7;
  font-size: 12px;
  color: #666;
`;

const CommentTitleInput = styled.input`
  display: flex;
  width: 96%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid #dddfe1;
  font-size: 12px;
  color: #000;
  line-height: 18px;
  outline: none;
  margin-top: -4px;
`;

const CommentTextWrap = styled.div`
  /* display: flex;
  height: 272px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -133px;
`;

const CommentTextTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 39px;
  padding: 0 20 222px;
  width: 153px;
  height: 100%;
  border-top: 1px solid #dddfe1;
  background-color: #f7f7f7;
  font-size: 12px;
  color: #666;
  text-overflow: hidden;
  text-align: center;
`;

const CommentTextInput = styled.textarea`
  display: flex;
  width: 100%;
  height: 234px;
  padding: 0 10px;
  border: 1px solid #dddfe1;
  font-size: 12px;
  color: #000;
  line-height: 18px;
  outline: none;
  margin-top: 7px;
  margin-bottom: 100px;

  resize: none;
`;

const CommentPhotoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -133px;
`;

const CommentPhotoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 41px;
  padding: 0 20 222px;
  width: 153px;
  height: 100%;
  border-top: 1px solid #dddfe1;
  border-bottom: 1px solid #dddfe1;
  background-color: #f7f7f7;
  font-size: 12px;
  color: #666;
  text-overflow: hidden;
  text-align: center;
`;

const PhotoDesc = styled.div`
  display: flex;
  height: 60px;
  padding: 0 10px;
  font-size: 12px;
  text-align: center;
  word-break: inherit;
  color: #666;
  line-height: 18px;
  outline: none;
  margin-top: 140px;
  margin-bottom: -60px;
  margin-left: 9px;
`;

const PhotoUpload = styled.div`
  text-align: center;
  width: 80px;
  height: 80px;
  margin: 10px 0;
  border: 1px solid #dddfe1;
  margin: 10px;
  margin-top: 40px;
  padding-bottom: 10px;
  display: block;
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const CommentTitleBorder4 = styled.div`
  border-top: 1px solid #dddfe1;
  padding: 10px 0px 10px 10px;
  width: 677px;
  display: flex;
  justify-content: center;
  margin-top: 25.5px;
  margin-left: -600px;
`;

const Issue = styled.p`
  font-size: 12px;
  display: flex;
  margin-top: 20px;
  color: #949296;
`;

const IssueSpan = styled.span`
  color: #5f0081;
  background: url(https://res.kurly.com/pc/ico/1806/ico_arrow_12x20.png)
    no-repeat 100% 4px;
  background-size: 6px 10px;
  padding: 0 9px 0 5px;
`;

const Button = styled.button`
  margin: 40px auto;
  width: 20%;
  height: 54px;
  border-radius: 3px;
  border: 1px solid #5f0081;
  background-color: #5f0080;
  cursor: pointer;
  display: block;
  justify-content: center;
  overflow: hidden;
  text-align: center;
`;

const CommentContainer = styled.div`
  width: 820px;
  margin: 0 auto;
  padding: 0px 0px 60px 0px;
`;

export default ReviewWrite;
