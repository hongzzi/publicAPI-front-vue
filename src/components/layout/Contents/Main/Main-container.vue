<template>
  <b-container>
    <b-carousel
      id="carousel-main"
      :interval="7000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide
        v-for="(item, index) in carouselData"
        :key="index"
        :caption="item.caption"
        :text="item.text"
        :img-src="getImgUrl(item.imgSrc)"
        img-width="1024"
        img-height="480"
      ></b-carousel-slide>
    </b-carousel>

    <div class="mt-4">
      <h4>안전한 먹거리를 위한 우리들의 노력</h4>
      <b-card
        :img-src="getImgUrl(cardData[0].imgSrc)"
        img-width="40%"
        img-height="300"
        img-alt="Card image"
        img-left
        class="mb-3"
      >
        <b-card-text>
          <h2 class="card-title">{{cardData[0].title}}</h2>
          <p class="card-text">{{cardData[0].content}}</p>
        </b-card-text>
        <a href="#" class="btn btn-primary">Read More &rarr;</a>
      </b-card>

      <b-card
        :img-src="getImgUrl(cardData[1].imgSrc)"
        img-width="40%"
        img-height="300"
        img-alt="Card image"
        img-right
        class="mb-3"
      >
        <b-card-text>
          <h2 class="card-title">{{cardData[1].title}}</h2>
          <p class="card-text">{{cardData[1].content}}</p>
        </b-card-text>
        <a href="#" class="btn btn-primary">Read More &rarr;</a>
      </b-card>

      <b-card
        :img-src="getImgUrl(cardData[2].imgSrc)"
        img-width="40%"
        img-height="300"
        img-alt="Card image"
        img-left
        class="mb-3"
      >
        <b-card-text>
          <h2 class="card-title">{{cardData[2].title}}</h2>
          <p class="card-text">{{cardData[2].content}}</p>
        </b-card-text>
        <a href="#" class="btn btn-primary">Read More &rarr;</a>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      carouselData: [
        {
          caption: "첫번째 화면",
          text: "대충 첫번째 화면",
          imgSrc: "header1.jpg"
        },
        {
          caption: "두번째 화면",
          text: "대충 두번째 화면",
          imgSrc: "header2.jpg"
        },
        {
          caption: "세번째 화면",
          text: "대충 세번째 화면",
          imgSrc: "header3.jpg"
        }
      ],
      cardData: [
        {
          title: "음식의 정보를 정확하게!",
          content:
            "평소 우리가 자주먹던 음식들, 과연 어떤 성분들로 이루어져 있을까요?",
          imgSrc: "main_card1.jpg"
        },
        {
          title: "누구보다 건강하게 먹기!",
          content:
            "이제 매 끼니도 신경써서 먹기! 내가 먹은 내용들을 한눈에 알아볼 수 있어요.",
          imgSrc: "main_card2.jpg"
        },
        {
          title: "오늘의 메뉴는?",
          content:
            "오늘의 점심메뉴, 저녁메뉴는 과연 몇칼로리이고, 영양 성분은 골고루일까요?",
          imgSrc: "main_card3.jpg"
        }
      ]
    };
  },
  methods: {
    getImgUrl(img) {
      return require("../../../../assets/main_img/" + img);
    }
  }
};
</script>

<style scoped>
</style>