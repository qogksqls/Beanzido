
<template>
  <div>
    <div>
      <button @click="disconnect" v-if="status === 'connected'">연결끊기</button>
      <button @click="connect" v-if="status === 'disconnected'">연결</button>
      {{ status }}
      <br />
      <br />
      <div v-if="status === 'connected'">
        <form @submit.prevent="sendMessage" action="#">
          <input v-model="message" />
          <input type="file" @change="fileChange"/>
          <button type="submit">메세지 전송</button>
        </form>
        <ul id="logs">
          <li v-for="log in logs" :key="log" class="log">{{log.message}}
            <img :src = log.img>
          </li>
        </ul>
      </div>
    </div>
    <div id="map"></div>
    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      img : null,
      imgURL : null,
      logs: [],
      socket : null,
      status: "disconnected",

      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441]
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912]
      ],
      markers: [],
      infowindow: null
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);

      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=236289c6dfb0d8a0c3afca2f0d7fefeb";
      document.head.appendChild(script);
    }
  },
  methods: {
    fileChange: function(e) {
                console.log(e.target.files)//files는 배열로 들어온다.
                // this.img = e.target.files[0];
                const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        console.log(reader.result)	// base64
        this.img=reader.result;
      }
            },

    //
    connect() {
      this.socket = new WebSocket("ws://localhost:8080/chat-server/map");
      this.socket.binaryType ="arraybuffer";
      this.socket.onopen = () => {
        this.status = "connected";
        this.logs.push({
          event: "연결 완료: ",
          data: "ws://localhost:8080/chat-server/map"
        });

        this.socket.onmessage = ({ data }) => {
          

            console.log(data);
            data = JSON.parse(data);
            this.logs.push(data);

        };
      };
    },
    disconnect() {
      this.socket.close();
      this.status = "disconnected";
      this.logs = [];
    },
   sendMessage(e) {
      e;
     const dto ={
      content : this.message,
      img : this.img,
      location : '서울 특별시 영등포구 도림천로 15길 15-15',
      latitude : 36.22,
      longitude : 36.22,
      color : 2,
      nickName : '부들 부들',
      
     }
      this.socket.send(JSON.stringify({content: this.message, img:this.img}));
      this.logs.push({ event: "메시지 전송", data: this.message });
      
      this.message = "";
    },
    //
    getMessage(Message) {
      // this.Messages.add(Message)
      Message;
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = Message.content, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(Message.latitude, Message.longitude), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
      });
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      const positions = markerPositions.map(
        position => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          position =>
            new kakao.maps.Marker({
              map: this.map,
              position
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
      });

      this.map.setCenter(iwPosition);
    }
  }
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
