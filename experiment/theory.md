### Theory

<center>
  <img src="images/th1.png" height="350px">
  
Fig. 1. Circuit diagram of diode bridge rectifier.

</center>
<br>
Diode bridge rectifier circuit operates in two modes: (a) Positive half cycle of input ac voltage and (b) Negative half cycle of input ac voltage. Brief description of these modes can easily be understood from the equivalent circuits given below.
<br><br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>
  
<img src="images/th2.png">
<br><br>
Fig. 2(a). Positive-half cycle.
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th3.png">
<br><br>
Fig. 2(b). Negative-half cycle.
<br><br>
</center> 
    </td>
  </tr>
</table>
<br>

<br>
During the positive half-cycle of the AC input voltage, diodes ‘D<sub>1</sub>’ and ‘D<sub>2</sub>’ are conducting and the power is supplied to the load while in the negative half-cycle diodes ‘D<sub>3</sub>’ and ‘D<sub>4</sub>’ are conducting. The steady-state waveforms of the output voltage (V<sub>o</sub>), input current (I<sub>in</sub>) and diode voltage (V<sub>D1</sub>) are shown in Fig. 3. The output load voltage is pulsating DC superimposed with ac ripple.
<br><br>

<center>
  <img src="images/th3b.png">
  
Fig. 3. Circuit diagram of diode bridge rectifier with LC filter.

</center>
<br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>
  
<img src="images/th4a.png" height="500px">
<br><br>
(a) Waveforms without filter.
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th4b.png" height="500px">
<br><br>
(b) Waveforms with LC-filter.
<br><br>
</center> 
    </td>
  </tr>
  <tr>
    <td colspan="2" >
      <center>Fig.4. Steady-state waveform of diode bridge rectifier.</center>
    </td>
  </tr>
</table>
<br>
<br>

The n<sup>th</sup> harmonic ripple current has to pass through the filter capacitor for which the load impedance has to be greater than the filter capacitor impedance, i.e.

<br>
<div style="float: left; width:50%;">
  <img src="images/th5.png" height="60px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br>

<div style="float: left; width:100%;"><br>
Assume the following to satisfy this relation
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th6.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)

</div>

<div style="float: left; width:100%;"><br>
From the above expression the value of capacitor filter can be calculated:
</div>

<div style="float: left; width:50%;"><br>
  <img src="images/th7.png" height="62px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>


<div style="float: left; width:100%;"><br>
The Fourier series of the output voltage with RL load is:
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th8.png" height="55px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(4)

</div>

<div style="float: left; width:100%;"><br>
The DC component is:
</div>

<div style="float: left; width:50%;"><br>
  <img src="images/th9.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(5)

</div>
<br>

<div style="float: left; width:100%;"><br>
and the AC component is:
</div>

<div style="float: left; width:50%;"><br>
  <img src="images/th10.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(6)

</div>

<div style="float: left; width:100%;">
The above equation is simplified by considering only the dominant harmonics, second harmonic is the dominant one and its rms value is 
</div>

<div style="float: left; width:50%;">
  <img src="images/th11.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(7)

</div>


<div style="float: left; width:100%;"><br>
Therefore
</div>

<div style="float: left; width:50%;">
  <img src="images/th12.png" height="56px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(8)

</div>


<div style="float: left; width:100%;"><br>
The load voltage expression is:
</div>

<div style="float: left; width:50%;">
  <img src="images/th13.png" height="55px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(9)

</div>


<div style="float: left; width:100%;"><br>
Assume the ripple factor and obtain the value of filter inductor<br><br>
Let RF = 0.1<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th14.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(10)

</div>


<div style="float: left; width:100%;"><br>
Use the value of C<sub>f</sub> and compute L<sub>f</sub> using eq.(3) and eq.(10). The LC-filter based single phase diode bridge rectifier with RL load is ready to perform the experiment and its steady-state waveforms are shown in Fig. 3.<br><br>
The output current Idc can easily be computed as:
</div>

<div style="float: left; width:50%;">
  <img src="images/th15.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(11)

</div>


<div style="float: left; width:100%;"><br>
The output power (P) can easily be computed as:
</div>

<div style="float: left; width:50%;">
  <img src="images/th16.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(12)

</div>
