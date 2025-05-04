import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, IconButton, Grid, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const MAX_CRITERIA = 10;

const DecisionMaker = () => {
  const [tableData, setTableData] = useState([
    { id: 0, name: '', type: 'alternative' },
    { id: 1, name: '', type: 'criterion', weight: '' }
  ]);
  const [error, setError] = useState('');
  const [matrix, setMatrix] = useState({});

  const handleTableChange = (id, field, value) => {
    const newData = tableData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setTableData(newData);
  };

  const addRow = () => {
    const newRow = { 
      id: tableData.length,
      name: '',
      type: 'alternative'
    };
    setTableData([...tableData, newRow]);
  };

  const addColumn = () => {
    if (tableData.filter(item => item.type === 'criterion').length < MAX_CRITERIA) {
      const newColumn = {
        id: tableData.length,
        name: '',
        type: 'criterion',
        weight: ''
      };
      setTableData([...tableData, newColumn]);
    }
  };

  const removeRow = (id) => {
    if (tableData.filter(item => item.type === 'alternative').length > 1) {
      setTableData(tableData.filter(item => item.id !== id));
    }
  };

  const removeColumn = (id) => {
    if (tableData.filter(item => item.type === 'criterion').length > 1) {
      setTableData(tableData.filter(item => item.id !== id));
    }
  };

  const handleMatrixChange = (rowId, colId, value) => {
    setMatrix(prev => ({
      ...prev,
      [`${rowId}-${colId}`]: value
    }));
  };

  const calculateResults = () => {
    // Ağırlıkların toplamını kontrol et
    const totalWeight = tableData
      .filter(item => item.type === 'criterion')
      .reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);
    
    if (totalWeight !== 100) {
      setError('Ağırlıkların toplamı %100 olmalıdır');
      return;
    }

    // Alanları kontrol et
    const hasEmptyFields = tableData.some(item => 
      !item.name || (item.type === 'criterion' && !item.weight)
    );
    
    if (hasEmptyFields) {
      setError('Tüm alanları doldurunuz');
      return;
    }

    setError('');

    // Sonuç hesaplamaları
    const alternatives = tableData.filter(item => item.type === 'alternative');
    const criteria = tableData.filter(item => item.type === 'criterion');

    const results = alternatives.map(alt => {
      let score = 0;
      criteria.forEach(crit => {
        const value = matrix[`${alt.id}-${crit.id}`] || '';
        if (value) {
          const weight = parseFloat(crit.weight) / 100;
          score += parseFloat(value) * weight;
        }
      });
      return score;
    });

    // Sonuçları sırala
    const sortedResults = alternatives.map((alt, index) => ({
      alternative: alt.name,
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addRow}
                      sx={{ mr: 1 }}
                    >
                      Alternatif Ekle
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addColumn}
                    >
                      Kriter Ekle
                    </Button>
                  </Box>
                  <Typography variant="caption" display="block">
                    En fazla {MAX_CRITERIA} kriter ekleyebilirsiniz
                  </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Alternatif</TableCell>
                        {tableData
                          .filter(item => item.type === 'criterion')
                          .map(criterion => (
                            <TableCell key={criterion.id}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                  value={criterion.name}
                                  onChange={(e) => handleTableChange(criterion.id, 'name', e.target.value)}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                <TextField
                                  label="%"
                                  type="number"
                                  value={criterion.weight}
                                  onChange={(e) => handleTableChange(criterion.id, 'weight', e.target.value)}
                                  size="small"
                                  sx={{ width: 80 }}
                                />
                                <IconButton
                                  onClick={() => removeColumn(criterion.id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData
                        .filter(item => item.type === 'alternative')
                        .map(alternative => (
                          <TableRow key={alternative.id}>
                            <TableCell>
                              <TextField
                                value={alternative.name}
                                onChange={(e) => handleTableChange(alternative.id, 'name', e.target.value)}
                                size="small"
                              />
                              <IconButton
                                onClick={() => removeRow(alternative.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            {tableData
                              .filter(item => item.type === 'criterion')
                              .map(criterion => (
                                <TableCell key={criterion.id}>
                                  <TextField
                                    value={matrix[`${alternative.id}-${criterion.id}`] || ''}
                                    onChange={(e) => handleMatrixChange(alternative.id, criterion.id, e.target.value)}
                                    size="small"
                                  />
                                </TableCell>
                              ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={calculateResults}
                  >
                    Karar Ver
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DecisionMaker;
