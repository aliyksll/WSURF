import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_CRITERIA = 10;

const DecisionMaker = () => {
  const [criteria, setCriteria] = useState([{ name: '', weight: '' }]);
  const [alternatives, setAlternatives] = useState(['']);
  const [matrix, setMatrix] = useState([]);
  const [error, setError] = useState('');

  const handleCriteriaChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  const handleAlternativeChange = (index, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = value;
    setAlternatives(newAlternatives);
  };

  const addCriteria = () => {
    if (criteria.length < MAX_CRITERIA) {
      setCriteria([...criteria, { name: '', weight: '' }]);
    }
  };

  const removeCriteria = (index) => {
    if (criteria.length > 1) {
      const newCriteria = [...criteria];
      newCriteria.splice(index, 1);
      setCriteria(newCriteria);
    }
  };

  const addAlternative = () => {
    setAlternatives([...alternatives, '']);
  };

  const removeAlternative = (index) => {
    if (alternatives.length > 1) {
      const newAlternatives = [...alternatives];
      newAlternatives.splice(index, 1);
      setAlternatives(newAlternatives);
    }
  };

  const handleMatrixChange = (row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = value;
    setMatrix(newMatrix);
  };

  const calculateResults = () => {
    // Ağırlıkların toplamını kontrol et
    const totalWeight = criteria.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);
    
    if (totalWeight !== 100) {
      setError('Ağırlıkların toplamı %100 olmalıdır');
      return;
    }

    // Ağırlıkları ve değerleri kontrol et
    const hasEmptyCriteria = criteria.some(c => !c.name || !c.weight);
    const hasEmptyAlternative = alternatives.some(a => !a);
    
    if (hasEmptyCriteria || hasEmptyAlternative) {
      setError('Tüm alanları doldurunuz');
      return;
    }

    setError('');

    // Sonuç hesaplamaları
    const results = alternatives.map((_, altIndex) => {
      let score = 0;
      criteria.forEach((c, critIndex) => {
        const weight = parseFloat(c.weight) / 100;
        const value = parseFloat(matrix[altIndex][critIndex]) || 0;
        score += value * weight;
      });
      return score;
    });

    // Sonuçları sırala
    const sortedResults = alternatives.map((alt, index) => ({
      alternative: alt,
      score: results[index]
    })).sort((a, b) => b.score - a.score);

    // Sonuçları göster
    alert('Karar Sonuçları:\n' + sortedResults.map(r => `${r.alternative}: ${r.score.toFixed(2)}`).join('\n'));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Karar Verme Aracı
        </Typography>

        <Typography variant="h5" gutterBottom>
          Kriterler
        </Typography>
        <Box sx={{ mb: 4 }}>
          {criteria.map((c, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label={`Kriter ${index + 1}`}
                value={c.name}
                onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Ağırlık (%100)"
                type="number"
                value={c.weight}
                onChange={(e) => handleCriteriaChange(index, 'weight', e.target.value)}
                sx={{ width: 120 }}
              />
              <IconButton onClick={() => removeCriteria(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={addCriteria}>
            Yeni Kriter Ekle
          </Button>
          <Typography variant="caption" display="block" gutterBottom>
            En fazla {MAX_CRITERIA} kriter ekleyebilirsiniz
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom>
          Alternatifler
        </Typography>
        <Box sx={{ mb: 4 }}>
          {alternatives.map((a, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label={`Alternatif ${index + 1}`}
                value={a}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => removeAlternative(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={addAlternative}>
            Yeni Alternatif Ekle
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Alternatif</TableCell>
                {criteria.map((c, index) => (
                  <TableCell key={index}>{c.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {alternatives.map((_, row) => (
                <TableRow key={row}>
                  <TableCell>{alternatives[row]}</TableCell>
                  {criteria.map((_, col) => (
                    <TableCell key={col}>
                      <TextField
                        type="number"
                        value={matrix[row]?.[col] || ''}
                        onChange={(e) => handleMatrixChange(row, col, e.target.value)}
                        size="small"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={calculateResults}
          sx={{ mt: 4 }}
        >
          Karar Ver
        </Button>
      </Box>
    </Container>
  );
};

export default DecisionMaker;
