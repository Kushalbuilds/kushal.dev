import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, Bug, Terminal, Cpu } from 'lucide-react';

export default function TestingLab3D() {
  const [selectedSuite, setSelectedSuite] = useState('regression');
  const [status, setStatus] = useState('idle'); // idle, running, completed
  const [logs, setLogs] = useState([
    '[INIT] QA & Embedded Firmware Test Workbench initialized.',
    '[READY] Select a test suite and run verification.'
  ]);

  const testSuites = [
    {
      id: 'regression',
      name: 'Regression Suite',
      badge: 'STLC Verified',
      cases: [
        'TC-01: Authentication Boundary Condition Check',
        'TC-02: User Session & Cookie Persistence Test',
        'TC-03: CRUD Input Validation & SQL Injection Escaping'
      ]
    },
    {
      id: 'api',
      name: 'REST API & Postman Suite',
      badge: 'HTTP Status 200 OK',
      cases: [
        'GET /api/v1/employees/search - Query param boundary validation',
        'POST /api/v1/records - Schema payload verification',
        'PUT /api/v1/records/:id - Concurrency & status code 200/204'
      ]
    },
    {
      id: 'embedded',
      name: 'ESP32 & LVGL Hardware Suite',
      badge: 'Firmware 1.0.4',
      cases: [
        'I2C / SPI Bus Communication Ping Latency < 1.2ms',
        'LVGL Display Buffer Rendering at 60 FPS without Frame Drop',
        'GPIO Interrupt Service Routine Reliability Under Load'
      ]
    }
  ];

  const handleRun = () => {
    setStatus('running');
    setLogs((prev) => [...prev, `>>> Executing suite: [${selectedSuite.toUpperCase()}]`]);

    const activeSuite = testSuites.find(s => s.id === selectedSuite);

    activeSuite.cases.forEach((tc, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[PASS] ${tc} - verified in ${(Math.random() * 45 + 12).toFixed(1)}ms`]);
        if (idx === activeSuite.cases.length - 1) {
          setStatus('completed');
          setLogs((prev) => [...prev, `✔ ALL CHECKS PASSED. 0 Defects detected in target release.`]);
        }
      }, (idx + 1) * 600);
    });
  };

  const handleReset = () => {
    setStatus('idle');
    setLogs([
      '[RESET] System reset to default diagnostic state.',
      '[READY] Select a test suite and run verification.'
    ]);
  };

  return (
    <div className="testing-lab-container">
      <div className="lab-header">
        <div className="lab-title">
          <Terminal size={22} className="accent-icon" />
          <span>Interactive QA & Embedded Test Terminal</span>
        </div>
        <div className="lab-status-pill">
          <span className={`status-dot ${status}`}></span>
          <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
            {status}
          </span>
        </div>
      </div>

      <div className="lab-grid">
        <div className="suite-selector">
          <label className="section-subtitle">Select Test Environment</label>
          {testSuites.map((suite) => (
            <button
              key={suite.id}
              className={`suite-btn ${selectedSuite === suite.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedSuite(suite.id);
                if (status === 'completed') setStatus('idle');
              }}
            >
              <div className="suite-btn-content">
                <span className="suite-name">{suite.name}</span>
                <span className="suite-badge">{suite.badge}</span>
              </div>
            </button>
          ))}

          <div className="action-buttons">
            <button
              className="btn btn-primary"
              onClick={handleRun}
              disabled={status === 'running'}
            >
              <Play size={16} />
              {status === 'running' ? 'Executing Tests...' : 'Run Test Suite'}
            </button>
            <button className="btn btn-ghost" onClick={handleReset}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        <div className="console-wrapper">
          <div className="console-topbar">
            <span>bash: kushal-tester@qa-env:~</span>
            <span>UTF-8</span>
          </div>
          <div className="console-body">
            {logs.map((log, index) => (
              <div key={index} className="log-line">
                <span className="log-prefix">&gt;</span>
                <span className={log.includes('PASS') || log.includes('✔') ? 'log-success' : log.includes('Executing') ? 'log-highlight' : 'log-text'}>
                  {log}
                </span>
              </div>
            ))}
            {status === 'running' && (
              <div className="log-line typing">
                <span className="cursor-blink">_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

