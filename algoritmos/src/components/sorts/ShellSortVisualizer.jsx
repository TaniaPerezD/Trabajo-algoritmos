import React, { useState, useEffect, useRef } from 'react';
import './ShellSortVisualizer.css';
import { Howl } from 'howler';
import { saveAs } from 'file-saver';
import {
  getShellSortAnimationsAsc,
  getShellSortAnimationsDesc
} from '../../algoritmos/sorts/ShellSort';
import { FaFileImport, FaFileExport, FaPlay, FaRandom, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ANIMATION_SPEED_MS = 50;

const ShellSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [count, setCount] = useState(30);
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(300);
  const [gapInput, setGapInput] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [inputMode, setInputMode] = useState('random');
  const [manualInput, setManualInput] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  useEffect(() => {
    generateArray();
  }, [count, min, max]);

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

    setTimeout(() => {
      const bars = document.getElementsByClassName('array-bar');
      Array.from(bars).forEach(bar => {
        bar.style.backgroundColor = '#baecff';
      });
    }, 0);
  };

  const parseGaps = () => {
    return gapInput
      .split(',')
      .map(g => parseInt(g.trim()))
      .filter(g => !isNaN(g) && g > 0);
  };

  const playSound = () => {
    const sound = new Howl({
      src: ['https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'],
      volume: 0.2
    });
    sound.play();
  };

  const shellSortAsc = () => {
    const gaps = parseGaps();
    const startTime = Date.now();
    setElapsedTime(0);
    setIsSorting(true);

    intervalRef.current = setInterval(() => {
      setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
    }, 100);

    const animations = getShellSortAnimationsAsc([...array], gaps);
    const arrayBars = document.getElementsByClassName('array-bar');
    const workingArray = [...array];

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
          playSound();
        }

        if (i === animations.length - 1) {
          setTimeout(() => {
            clearInterval(intervalRef.current);
            setArray([...workingArray]);
            setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
            setIsSorting(false);
          }, ANIMATION_SPEED_MS);
        }
      }, i * ANIMATION_SPEED_MS);
    });
  };

  const shellSortDesc = () => {
    const gaps = parseGaps();
    const startTime = Date.now();
    setElapsedTime(0);
    setIsSorting(true);

    intervalRef.current = setInterval(() => {
      setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
    }, 100);

    const animations = getShellSortAnimationsDesc([...array], gaps);
    const arrayBars = document.getElementsByClassName('array-bar');
    const workingArray = [...array];

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
          playSound();
        }

        if (i === animations.length - 1) {
          setTimeout(() => {
            clearInterval(intervalRef.current);
            setArray([...workingArray]);
            setElapsedTime(((Date.now() - startTime) / 1000).toFixed(2));
            setIsSorting(false);
          }, ANIMATION_SPEED_MS);
        }
      }, i * ANIMATION_SPEED_MS);
    });
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
      if (values.length > 0) {
        setCount(values.length);
        setMin(Math.min(...values));
        setMax(Math.max(...values));
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    if (isSorting || originalArray.length === 0 || JSON.stringify(originalArray) === JSON.stringify(array)) {
      Swal.fire({
        icon: 'warning',
        title: 'Exportación no válida',
        text: 'Primero debes ordenar para poder exportar.',
        confirmButtonColor: '#f48fb1'
      });
      return;
    }
    setShowExportModal(true);
  };

  const confirmExport = () => {
    let content = '';
    let blob;
    switch (exportFormat) {
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
    saveAs(blob, `array.${exportFormat}`);
    setShowExportModal(false);
  };

  return (
    <div className="sort-container">
      <div className="sidebar">
        <div className="mode-toggle">
          <button className={inputMode === 'random' ? 'active' : ''} onClick={() => setInputMode('random')} disabled={isSorting}>
            Aleatorio
          </button>
          <button className={inputMode === 'manual' ? 'active' : ''} onClick={() => setInputMode('manual')} disabled={isSorting}>
            Manual
          </button>
        </div>

        {inputMode === 'manual' ? (
          <label>
            <span>Números (separados por coma):</span>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Ej: 10,20,30"
            />
          </label>
        ) : (
          <>
            <label><span>Cantidad:</span>
              <input type="text" value={count || ''} onChange={(e) => {
                const val = e.target.value.trim();
                if (val === '' || /^[1-9][0-9]*$/.test(val)) {
                  setCount(val === '' ? 0 : parseInt(val));
                }
              }} />
            </label>
            <label><span>Mínimo:</span>
              <input type="text" value={min || ''} onChange={(e) => {
                const val = e.target.value.trim();
                if (val === '' || /^[1-9][0-9]*$/.test(val)) {
                  setMin(val === '' ? 0 : parseInt(val));
                }
              }} />
            </label>
            <label><span>Máximo:</span>
              <input type="text" value={max || ''} onChange={(e) => {
                const val = e.target.value.trim();
                if (val === '' || /^[1-9][0-9]*$/.test(val)) {
                  setMax(val === '' ? 0 : parseInt(val));
                }
              }} />
            </label>
          </>
        )}

        <label><span>Cortes (gaps):</span>
          <input type="text" placeholder="Ej: 5,3,1" value={gapInput} onChange={(e) => setGapInput(e.target.value)} disabled={isSorting} />
        </label>

        <div className="button-row">
          <button onClick={generateArray} title="Generar"><FaRandom /> Generar</button>
          <button onClick={shellSortAsc} disabled={isSorting}><FaPlay /> Ascendente</button>
          <button onClick={shellSortDesc} disabled={isSorting}><FaPlay style={{ transform: 'rotate(180deg)' }} /> Descendente</button>
          <button onClick={handleImport}><FaFileImport /> Importar</button>
          <button onClick={handleExport}><FaFileExport /> Exportar</button>
        </div>

        <input type="file" id="fileInput" accept=".json,.csv,.txt" style={{ display: 'none' }} onChange={handleFileChange} />
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
                  onMouseEnter={(e) => !isSorting && (e.currentTarget.style.backgroundColor = '#99d6f5')}
                  onMouseLeave={(e) => !isSorting && (e.currentTarget.style.backgroundColor = '#baecff')}
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

        {!isSorting && originalArray.length > 0 && (
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

      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Formato de exportación</h3>
            <select value={exportFormat} onChange={e => setExportFormat(e.target.value)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="txt">TXT</option>
            </select>
            <div className="modal-buttons">
              <button onClick={confirmExport}>Exportar</button>
              <button onClick={() => setShowExportModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShellSortVisualizer;