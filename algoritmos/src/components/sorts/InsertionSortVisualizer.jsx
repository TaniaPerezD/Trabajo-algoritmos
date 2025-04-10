import React, { useState, useEffect, useRef } from 'react';
import './InsertionSortVisualizer.css';
import { Howl } from 'howler';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import {
  getInsertionSortAnimationsAsc,
  getInsertionSortAnimationsDesc
} from '../../algoritmos/sorts/InsertionSort';
import { FaFileImport, FaFileExport, FaPlay, FaRandom, FaClock ,FaRegTrashAlt } from 'react-icons/fa';

const ANIMATION_SPEED_MS = 50;

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState(() => {
    const saved = localStorage.getItem('sharedArray');
    return saved ? JSON.parse(saved) : [];
  });
  const [originalArray, setOriginalArray] = useState(() => {
    const saved = localStorage.getItem('sharedOriginalArray');
    return saved ? JSON.parse(saved) : [];
  });
  const [count, setCount] = useState(30);
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(300);
  const [isSorting, setIsSorting] = useState(false);
  const [inputMode, setInputMode] = useState('random');
  const [manualInput, setManualInput] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  useEffect(() => {
      const saved = localStorage.getItem('sharedArray');
      const originalSaved = localStorage.getItem('sharedOriginalArray');
      if (!saved || !originalSaved) {
        generateArray();
      }
    }, []);

  const generateArray = () => {
    let values = [];
    if (inputMode === 'manual') {
      values = manualInput
        .split(',')
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v) && v > 0);
    } else {
      values = Array.from({ length: count }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    }
    setArray(values);
    setOriginalArray([...values]);
    localStorage.setItem('sharedArray', JSON.stringify(values));
    localStorage.setItem('sharedOriginalArray', JSON.stringify([...values]));
    setTimeout(() => {
      const bars = document.getElementsByClassName('array-bar');
      Array.from(bars).forEach(bar => {
        bar.style.backgroundColor = '#baecff';
      });
    }, 0);
  };
  const resetArray = () => {
    let values = [];
    setArray(values);
    setOriginalArray([...values]);
    localStorage.setItem('sharedArray', JSON.stringify(values));
    localStorage.setItem('sharedOriginalArray', JSON.stringify([...values]));
    setTimeout(() => {
      const bars = document.getElementsByClassName('array-bar');
      Array.from(bars).forEach(bar => {
        bar.style.backgroundColor = '#baecff';
      });
    }, 0);
  };
  const resetToOriginalOrder = () => {
    setArray([...originalArray]);
    localStorage.setItem('sharedArray', JSON.stringify([...originalArray]));

    setTimeout(() => {
      const bars = document.getElementsByClassName('array-bar');
      Array.from(bars).forEach(bar => {
        bar.style.backgroundColor = '#baecff';
      });
    }, 0);
  };
  const playSound = (value) => {
      const sound = new Howl({
        src: ['https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'],
        volume: 0.2,
        rate: 1 + value / 300,
      });
      sound.play();
    };
  const handleImport = () => document.getElementById('fileInput').click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      let values = [];

      if (file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) values = parsed.map(Number);
        } catch {
          Swal.fire({
            icon: 'error',
            title: 'Archivo inválido',
            text: 'El archivo JSON no es válido.',
            confirmButtonColor: '#f48fb1'
          });
          return;
        }
      } else if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        values = content.split(/\r?\n/).map(line => parseInt(line.trim())).filter(n => !isNaN(n));
      }

      setArray(values);
      localStorage.setItem('sharedArray', JSON.stringify(values));
      if (values.length > 0) {
        setCount(values.length);
        setMin(Math.min(...values));
        setMax(Math.max(...values));
        localStorage.setItem('sharedOriginalArray', JSON.stringify([...values]));
      }
    };
    reader.readAsText(file);
  };

  const handleExport = async () => {
      const { value: format } = await Swal.fire({
        title: 'Selecciona formato de exportación',
        input: 'select',
        inputOptions: {
          json: 'JSON',
          csv: 'CSV',
          txt: 'TXT'
        },
        inputPlaceholder: 'Selecciona formato',
        showCancelButton: true,
        confirmButtonText: 'Exportar',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'custom-swal-modal'
        }
      });
  
      if (!format) return;
  
      let content = '';
      let blob;
  
      switch (format) {
        case 'json':
          content = JSON.stringify(array, null, 2);
          blob = new Blob([content], { type: 'application/json;charset=utf-8' });
          break;
        case 'csv':
        case 'txt':
          content = array.join('\n');
          blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          break;
        default:
          Swal.fire({
            icon: 'error',
            title: 'Error de formato',
            text: 'Formato de exportación no reconocido.',
            confirmButtonColor: '#f48fb1'
          });
          return;
      }
  
      saveAs(blob, `array.${format}`);
    };
  const insertionSortAsc = () => {
    const startTime = Date.now();
    setElapsedTime(0);
    setIsSorting(true);
  
    intervalRef.current = setInterval(() => {
      setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
    }, 100);
  
    const animations = getInsertionSortAnimationsAsc([...array]);
    const arrayBars = document.getElementsByClassName('array-bar');
    const workingArray = [...array];
  
    Array.from(arrayBars).forEach(bar => {
      bar.style.backgroundColor = '#baecff';
    });
  
    animations.forEach(([type, idx1, idx2OrValue], i) => {
      setTimeout(() => {
        if (type === 'compare') {
          arrayBars[idx1].style.backgroundColor = '#f48fb1';
          arrayBars[idx2OrValue].style.backgroundColor = '#f48fb1';
        } else if (type === 'revert') {
          arrayBars[idx1].style.backgroundColor = '#baecff';
          arrayBars[idx2OrValue].style.backgroundColor = '#baecff';
        } else if (type === 'overwrite') {
          workingArray[idx1] = idx2OrValue;
          setArray([...workingArray]);
          localStorage.setItem('sharedArray', JSON.stringify([...workingArray]));
          playSound();
        }
  
        if (i === animations.length - 1) {
          setTimeout(() => {
            clearInterval(intervalRef.current);
            setArray([...workingArray]);
            localStorage.setItem('sharedArray', JSON.stringify([...workingArray]));
            setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
            setIsSorting(false);
          }, ANIMATION_SPEED_MS);
        }
      }, i * ANIMATION_SPEED_MS);
    });
  };
  
  const insertionSortDesc = () => {
    const startTime = Date.now();
    setElapsedTime(0);
    setIsSorting(true);
  
    intervalRef.current = setInterval(() => {
      setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
    }, 100);
  
    const animations = getInsertionSortAnimationsDesc([...array]);
    const arrayBars = document.getElementsByClassName('array-bar');
    const workingArray = [...array];
  
    Array.from(arrayBars).forEach(bar => {
      bar.style.backgroundColor = '#baecff';
    });
  
    animations.forEach(([type, idx1, idx2OrValue], i) => {
      setTimeout(() => {
        if (type === 'compare') {
          arrayBars[idx1].style.backgroundColor = '#f48fb1';
          arrayBars[idx2OrValue].style.backgroundColor = '#f48fb1';
        } else if (type === 'revert') {
          arrayBars[idx1].style.backgroundColor = '#baecff';
          arrayBars[idx2OrValue].style.backgroundColor = '#baecff';
        } else if (type === 'overwrite') {
          workingArray[idx1] = idx2OrValue;
          setArray([...workingArray]);
          localStorage.setItem('sharedArray', JSON.stringify([...workingArray]));
          playSound();
        }
  
        if (i === animations.length - 1) {
          setTimeout(() => {
            clearInterval(intervalRef.current);
            setArray([...workingArray]);
            localStorage.setItem('sharedArray', JSON.stringify([...workingArray]));
            setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
            setIsSorting(false);
          }, ANIMATION_SPEED_MS);
        }
      }, i * ANIMATION_SPEED_MS);
    });
  };
  return (
    <div className="sort-container">
      {/* Panel izquierdo */}
            <div className="sidebar">
              <div className="mode-toggle">
                <button
                  className={inputMode === 'random' ? 'active' : ''}
                  onClick={() => setInputMode('random')}
                  disabled={isSorting}
                >
                  Aleatorio
                </button>
                <button
                  className={inputMode === 'manual' ? 'active' : ''}
                  onClick={() => setInputMode('manual')}
                  disabled={isSorting}
                >
                  Manual
                </button>
              </div>
        
              {inputMode === 'manual' ? (
                <label>
                  <span>Números (separados por coma):</span>
                  <input
  type="text"
  value={manualInput}
  onChange={(e) => {
    const filtered = e.target.value.replace(/[^0-9,]/g, '');
    setManualInput(filtered);
  }}
  placeholder="Ej: 10,20,30"
/>
                </label>
              ) : (
                <>
                  <label>
                    <span>Cantidad:</span>
                    <input
                      type="text"
                      value={count === 0 ? '' : count.toString()}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        if (val === '' || /^[1-9][0-9]*$/.test(val)) {
                          setCount(val === '' ? 0 : parseInt(val));
                        }
                      }}
                      placeholder="Ej: 10"
                    />
                  </label>
      
                  <label>
                    <span>Mínimo:</span>
                    <input
                      type="text"
                      value={min === 0 ? '' : min.toString()}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        if (val === '' || /^[1-9][0-9]*$/.test(val)) {
                          setMin(val === '' ? 0 : parseInt(val));
                        }
                      }}
                      placeholder="Ej: 5"
                    />
                  </label>
      
                  <label>
                    <span>Máximo:</span>
                    <input
                      type="text"
                      value={max === 0 ? '' : max.toString()}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        if (val === '' || /^[1-9][0-9]*$/.test(val)) {
                          setMax(val === '' ? 0 : parseInt(val));
                        }
                      }}
                      placeholder="Ej: 100"
                    />
                  </label>
                </>
              )}
        
              <div className="button-row">
                <button onClick={generateArray} title="Generar" disabled={isSorting}><FaRandom /> Generar</button>
                <button onClick={resetArray} title="Reset" disabled={isSorting}><FaRegTrashAlt /> Reset</button>
                <button onClick={resetToOriginalOrder} disabled={isSorting}>
                  ↺ Repetir
                </button>
                <button onClick={insertionSortAsc} disabled={isSorting}>
                  <FaPlay style={{ transform: 'rotate(180deg)' }}/> Ascendente
                </button>
      
                <button onClick={insertionSortDesc} disabled={isSorting}>
                  <FaPlay  /> Descendente
                </button>
                <button onClick={handleImport} disabled={isSorting}><FaFileImport /> Importar</button>
                <button onClick={handleExport} disabled={isSorting}><FaFileExport /> Exportar</button>
              </div>
        
              <input
                type="file"
                id="fileInput"
                accept=".json,.csv,.txt"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
        
              <p className="timer"><FaClock /> {elapsedTime} segundos</p>
            </div>
        
      <div className="visual-panel">
        <div className="array-box" style={{ height: '450px' }}>
          <div className="array-container">
            {array.map((val, idx) => {
              const maxVal = Math.max(...array);
              const barHeight = (val / maxVal) * 100;
              const barWidth = `${100 / array.length}%`;

              return (
                <div
                  className="array-bar"
                  key={idx}
                  onMouseEnter={(e) => {
                    if (!isSorting) e.currentTarget.style.backgroundColor = '#99d6f5';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSorting) e.currentTarget.style.backgroundColor = '#baecff';
                  }}
                  style={{
                    height: `${barHeight}%`,
                    width: barWidth,
                    backgroundColor: '#baecff',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {!isSorting && originalArray.length >= 0 && (
          <div className="info-panel">
            <div>
              <h4>Antes:</h4>
              <p>[{originalArray.join(', ')}]</p>
            </div>
            <div>
              <h4>Después:</h4>
              <p>[{array.join(', ')}]</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;