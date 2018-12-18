<template>
    <div>
        <h1 class="title">Percentis - Altura e Peso</h1>
        <p class="text-primary">Dados</p>
        <b-form >
            <b-form-group id="exampleGroup4">
                <div class="variable">
                    <b-input-group size="sm" prepend="Género" >
                        <b-form-select v-model="genderSelected" id="gender" required v-on:input="valueChanged('gender')" :options="genderOptions" size="sm"  />
                    </b-input-group>
                </div>
                <div class="variable">
                    <b-input-group size="sm" prepend="Data de Nascimento" >
                        <vuejs-datepicker v-model="birthdateValue" required :input="valueChanged('birthdate')" input-class="datepicker" :format="format" :disabledDates="disabledDates"></vuejs-datepicker>
                    </b-input-group>
                </div>
                <div class="variable">
                    <b-input-group size="sm" prepend="Peso" append="kg" >
                        <b-form-input type="number" v-model="weightValue" v-on:input="valueChanged('weight')" />
                    </b-input-group>
                </div>
                <div class="variable">
                    <b-input-group size="sm" prepend="Altura" append="cm" >
                        <b-form-input type="number" v-model="heightValue" v-on:input="valueChanged('height')" />
                    </b-input-group>
                </div>
            </b-form-group>
            <p class="text-danger" size="sm" v-if="errorvars">{{errorvars}}</p>
            <b-card-group columns class="resultgroup">
                <app-result v-if="resultWeight != null" unit="" description="Percentil Peso" observation="" :value="resultWeight===null ? 'A Calcular...' : String(resultWeight.percentile)" />
                <app-result v-if="resultHeight != null" unit="" description="Percentil Altura" observation="" :value="resultHeight===null ? 'A Calcular...' : String(resultHeight.percentile)" />
                <app-result v-if="bmi != null" unit="" description="IMC" observation="" :value="bmi===null ? 'A Calcular...' : String(bmi)" />
                <app-result v-if="resultBMI != null" unit="" description="Percentil IMC" :observation="bmiConclusion" :value="resultBMI===null ? 'A Calcular...' : String(resultBMI)" :variant="bmiVariant"/>
            </b-card-group>
            <p class="text-muted" size="sm" >Dados WHO Child Growth Standards</p>
        </b-form>
        
       
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import roundTo from 'round-to'
import bmiUtils from '../utilities/bmiUtils'

export default {
  name: 'percentil',
  data () {
    // console.log('data')
    let minDate = moment().subtract(1855, 'days').toDate()
    return {
      errorvars: '',
      previousBirthdate: null,
      birthdateValue: null,
      bdatestr: null,
      weightValue: null,
      previosWeight: null,
      heightValue: null,
      previousHeight: null,
      genderSelected: 'male',
      genderOptions: [
        { value: 'male', text: 'Masculino' },
        { value: 'female', text: 'Feminino' }
      ],
      format: 'yyyy-MM-dd',
      disabledDates: {
        to: minDate,
        from: new Date()
      },
      resultHeight: null,
      resultWeight: null,
      bmi: null,
      resultBMI: null,
      bmiConclusion: null,
      bmiVariant: null
    }
  },
  computed: {
  },
  created () {
    // console.log('created')
  },
  methods: {
    valueChanged (id) {
      if (id === 'birthdate') {
        if (this.birthdateValue != null) {
          this.errorvars = ''
        }
        if (this.previousBirthdate === this.birthdateValue) {
          return
        } else {
          this.previousBirthdate = this.birthdateValue
        }
      } else if (id === 'height') {
        if (this.previousHeight === this.heightValue) {
          return
        } else {
          this.previousHeight = this.heightValue
        }
      } else if (id === 'weight') {
        if (this.previousWeight === this.weightValue) {
          return
        } else {
          this.previousWeight = this.weightValue
        }
      }
      // console.log(id)
      this.onCalc(id)
    },
    onCalc (changedValue) {
      let calcWeight = false
      let calcHeight = false
      // console.log(this.birthdateValue)
      // console.log(this.genderSelected)
      if (this.birthdateValue == null) {
        this.errorvars = 'Preencha a data de nascimento para efectuar o cálculo.'
        this.resultWeight = null
        this.resultHeight = null
        this.resultBMI = null
        this.bmi = null
        this.bmiVariant = null
        return
      }
      this.bdatestr = moment(this.birthdateValue).format('YYYY-MM-DD')

      if (changedValue === 'birthdate' || changedValue === 'gender') {
        if (this.weightValue != null && this.weightValue > 0) {
          calcWeight = true
        }
        if (this.heightValue != null && this.heightValue > 0) {
          calcHeight = true
        }
      } else if (changedValue === 'weight') {
        if (this.weightValue != null && this.weightValue > 0) {
          calcWeight = true
        }
      } else if (changedValue === 'height') {
        if (this.heightValue != null && this.heightValue > 0) {
          calcHeight = true
        }
      }

      if (this.weightValue == null || this.weightValue <= 0) {
        this.resultWeight = null
        this.resultBMI = null
        this.bmi = null
        this.bmiConclusion = null
        this.bmiVariant = null
      }
      if (this.heightValue == null || this.heightValue <= 0) {
        this.resultHeight = null
        this.resultBMI = null
        this.bmi = null
        this.bmiConclusion = null
        this.bmiVariant = null
      }

      let promises = []
      if (calcWeight) {
        this.resultWeight = null
        // console.log('Calc weight')
        promises.push(axios.get(process.env.API_BASE_URL + '/weight/percentile/' + this.genderSelected + '/' + this.bdatestr + '/' + this.weightValue))
      }
      if (calcHeight) {
        this.resultHeight = null
        // console.log('Calc Height')
        promises.push(axios.get(process.env.API_BASE_URL + '/height/percentile/' + this.genderSelected + '/' + this.bdatestr + '/' + this.heightValue))
      }

      if ((calcWeight && calcHeight) || (calcWeight && this.heightValue != null && this.heightValue > 0) || (calcHeight && this.weightValue != null && this.weightValue > 0)) {
        promises.push(axios.get(process.env.API_BASE_URL + '/bmi/calculation?weight=' + this.weightValue + '&height=' + this.heightValue))
      }

      if (promises.length === 0) {
        return
      }
      var self = this
      Promise.all(promises).then(function (results) {
        results.forEach(function (res) {
          if (res.config.url.includes('/weight/percentile/')) {
            self.resultWeight = res.data
          } else if (res.config.url.includes('/height/percentile/')) {
            self.resultHeight = res.data
          } else if (res.config.url.includes('/bmi/calculation')) {
            self.bmi = roundTo(res.data, 2)
            axios.get(process.env.API_BASE_URL + '/bmi/percentile/' + self.genderSelected + '/' + self.bdatestr + '/' + res.data)
              .then(response => {
                let result = response.data
                self.resultBMI = result.percentile
                self.bmiConclusion = bmiUtils.translateToPT(result.conclusion)
                self.bmiVariant = bmiUtils.translateToVariant(result.conclusion)
              })
              .catch(e => {
                alert('Erro ao calcular percentil do bmi - ' + e)
              })
          }
        })
      })
    }
  }
}
</script>

<style>
.datepicker {

    display: block;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;


    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    position: relative;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    width: 100%;
    margin-bottom: 0;
}
.variable {
  padding: 5px
}
</style>

