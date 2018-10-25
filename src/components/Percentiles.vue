<template>
    <div>
        <h1 class="title">Percentis - Altura e Peso</h1>
        <p class="text-primary">Dados</p>
        <b-form >
            <b-form-group id="exampleGroup4">
                <div class="variable">
                    <b-input-group size="sm" prepend="Género" >
                        <b-form-select v-model="genderSelected" id="gender" required v-on:change="valueChanged('gender')" :options="genderOptions" size="sm"  />
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
                <app-result v-if="resultWeight != null" unit="" description="Percentil Peso" observation="" :value="resultWeight.percentile" />
                 <!--<la-cartesian v-if="resultWeight != null" animated autoresize :bound="[0]" :data="weightValues">
                    <la-bar dot curve prop="weight"></la-bar>
                    <la-x-axis prop="percentil"></la-x-axis>
                    <la-y-axis prop="weight"></la-y-axis>
                    <la-tooltip></la-tooltip>
                </la-cartesian>-->
                <app-result v-if="resultHeight != null" unit="" description="Percentil Altura" observation="" :value="resultHeight.percentile" />
            </b-card-group>
        </b-form>
        
       
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'drug',
  data () {
    console.log('data')
    let minDate = moment().subtract(1855, 'days').toDate()
    return {
      errorvars: '',
      previousBirthdate: null,
      birthdateValue: null,
      weightValue: 0,
      heightValue: 0,
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
      weightValues: []
    }
  },
  computed: {
  },
  created () {
    console.log('created')
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
      }
      console.log(id)
      this.onCalc(id)
    },
    onCalc (changedValue) {
      let calcWeight = false
      let calcHeight = false
      console.log(this.birthdateValue)
      if (this.birthdateValue == null) {
        this.errorvars = 'Preencha a data de nascimento para efectuar o cálculo.'
        this.resultWeight = null
        this.resultHeight = null
        return
      }
      let bdatestr = moment(this.birthdateValue).format('YYYY-MM-DD')

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
      }
      if (this.heightValue == null || this.heightValue <= 0) {
        this.resultHeight = null
      }

      let promises = []
      if (calcWeight) {
        console.log('Calc weight')
        promises.push(axios.get(process.env.API_BASE_URL + '/weight/percentile/' + this.genderSelected + '/' + bdatestr + '/' + this.weightValue))
      }
      if (calcHeight) {
        console.log('Calc Height')
        promises.push(axios.get(process.env.API_BASE_URL + '/height/percentile/' + this.genderSelected + '/' + bdatestr + '/' + this.heightValue))
      }
      if (promises.length === 0) {
        return
      }
      var self = this
      Promise.all(promises).then(function (results) {
        /* let translatePercentiles = function (pname) {
          let newname = pname.replace('P', '')
          if (newname === '01') {
            newname = '0.1'
          } else if (newname === '999') {
            newname = '99.9'
          }
          return newname
        } */
        results.forEach(function (res) {
          if (res.config.url.includes('weight')) {
            self.resultWeight = res.data
            self.weightValues = []
            // for (var k in self.resultWeight.percentilesforage) {
            //   self.weightValues.push({percentil: translatePercentiles(k), weight: self.resultWeight.percentilesforage[k]})
            // }
            console.log(self.weightValues)
          } else if (res.config.url.includes('height')) {
            self.resultHeight = res.data
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

