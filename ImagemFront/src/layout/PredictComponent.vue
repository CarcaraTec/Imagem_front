<template>
    <div class="predict-div">
      <InputText class="input" type="text" placeholder="Insira um texto" v-model="textToAnalyze" />
      <Button @click="handlePredict" label="Analisar"></Button>
      <span v-if="loading" class="loading-label">Carregando...</span>
      <span v-else-if="predictedSentiment" class="result-label">Sentimento: {{ predictedSentiment }}</span>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        textToAnalyze: '',
        predictedSentiment: null,
        loading: false
      };
    },
    methods: {
      async handlePredict() {
        this.loading = true;
        this.predictedSentiment = null;
        try {
          const response = await axios.get('http://127.0.0.1:5000/ml/predict', {
            params: {
              text: this.textToAnalyze
            }
          });
          this.predictedSentiment = response.data.sentiment;
        } catch (error) {
          this.predictedSentiment = 'Erro ao classificar texto';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .loading-label {
    margin-left: 10px;
    color: #999;
  }
  .result-label {
    margin-left: 10px;
    color: #999;
  }
  .predict-div {
    margin-left: 5%;
  }
  .input {
    margin-right: 10px;
  }
  </style>
  