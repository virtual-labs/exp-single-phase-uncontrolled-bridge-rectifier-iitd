const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),


  set() {
    let index = 0;
    this.allItems = {

      // !Template images
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // !Template images end

      // ! Procedure formula Nomenclature images 
      formulas_component_stress:this.allImgsDom[index++],
      formulas_efficiency:this.allImgsDom[index++],
      formulas_ideal:this.allImgsDom[index++],
      formulas_nomenclautre:this.allImgsDom[index++],
      formulas_non_ideal:this.allImgsDom[index++],
      formulas_procedure:this.allImgsDom[index++],
      formulas_universal:this.allImgsDom[index++],
      // ! Procedure formula Nomenclature images end

      //! EE15 images added here
      
      arrow_selected_cf:this.allImgsDom[index++],
      arrow_selected_rf:this.allImgsDom[index++],
      arrow_select_l:this.allImgsDom[index++],
      arrow_select_r:this.allImgsDom[index++],
      arrow_select_rf:this.allImgsDom[index++],
      btn_delete:this.allImgsDom[index++],
      btn_record:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      btn_start_experiment:this.allImgsDom[index++],
      circle:this.allImgsDom[index++],
      formula_cf:this.allImgsDom[index++],
      formula_rf:this.allImgsDom[index++],
      part_1_circuit:this.allImgsDom[index++],
      part_1_correct_text:this.allImgsDom[index++],
      part_1_text_1:this.allImgsDom[index++],
      part_1_text_2:this.allImgsDom[index++],
      part_1_text_3:this.allImgsDom[index++],
      part_2_box:this.allImgsDom[index++],
      part_2_circuit_left:this.allImgsDom[index++],
      part_2_circuit_right:this.allImgsDom[index++],
      part_2_graph:this.allImgsDom[index++],
      part_2_text:this.allImgsDom[index++],
      part_3_a:this.allImgsDom[index++],
      part_3_circuit:this.allImgsDom[index++],
      part_3_full_graph:this.allImgsDom[index++],
      part_3_graph_a:this.allImgsDom[index++],
      part_3_graph_v1:this.allImgsDom[index++],
      part_3_graph_v2:this.allImgsDom[index++],
      part_3_graph_v3:this.allImgsDom[index++],
      part_3_text:this.allImgsDom[index++],
      part_3_v_1:this.allImgsDom[index++],
      part_3_v_2:this.allImgsDom[index++],
      part_3_v_3:this.allImgsDom[index++],
      part_4_btn_dc_output:this.allImgsDom[index++],
      part_4_circuit:this.allImgsDom[index++],
      part_4_performance_tab:this.allImgsDom[index++],
      part_5_circuit:this.allImgsDom[index++],
      part_5_text_1:this.allImgsDom[index++],
      part_5_text_2:this.allImgsDom[index++],
      part_5_text_3:this.allImgsDom[index++],
      part_5_text_4:this.allImgsDom[index++],
      part_5_value_boxes:this.allImgsDom[index++],
      part_5_versus_tab:this.allImgsDom[index++],
      table_load_l:this.allImgsDom[index++],
      table_load_r:this.allImgsDom[index++],
      table_ripple_factor:this.allImgsDom[index++],
      tab_1:this.allImgsDom[index++],
      tab_2:this.allImgsDom[index++],
      tab_3:this.allImgsDom[index++],
      tab_4:this.allImgsDom[index++],
      value_box_cf:this.allImgsDom[index++],
      value_box_lf:this.allImgsDom[index++],
      btn_check:this.allImgsDom[index++],
      part_1_helper:this.allImgsDom[index++],
      arrow_selected_r:this.allImgsDom[index++],
      arrow_selected_l:this.allImgsDom[index++],
      arrow_selected_lf:this.allImgsDom[index++],
      part_2_circuit_right_load:this.allImgsDom[index++],

     
      //! EE15 images end here



      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
