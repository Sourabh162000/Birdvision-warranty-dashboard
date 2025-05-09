import React, { useState } from "react";
import { warranties as warrantyData } from "../data/warranties";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
  FormControl, InputLabel, Select, MenuItem,
  Button, Stack, Snackbar, Alert
} from "@mui/material";

export default function WarrantyTable() {
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState(warrantyData);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const showToast = (customer, product, type) => {
    const message =
      type === "Approved"
        ? `Approval - ${customer} regarding ${product}.`
        : `Rejection - ${customer} regarding ${product}.`;
    const severity = type === "Approved" ? "success" : "error";

    setToast({ open: true, message, severity });
  };

  const updateStatus = (index, newStatus) => {
    const updated = [...data];
    const item = updated[index];
    item.status = newStatus;
    setData(updated);
    showToast(item.customerName, item.productName, newStatus);
  };

  const filtered = filter === "All" ? data : data.filter(w => w.status === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Paper elevation={3} className="p-4 mb-6">
        <FormControl fullWidth>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filter}
            label="Status Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Customer Name</strong></TableCell>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Purchase Date</strong></TableCell>
              <TableCell><strong>Serial Number</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((w, i) => (
              <TableRow key={i}>
                <TableCell>{w.customerName}</TableCell>
                <TableCell>{w.productName}</TableCell>
                <TableCell>{w.purchaseDate}</TableCell>
                <TableCell>{w.serialNumber}</TableCell>
                <TableCell>{w.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {w.status !== "Approved" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => updateStatus(data.indexOf(w), "Approved")}
                      >
                        Approve
                      </Button>
                    )}
                    {w.status !== "Rejected" && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => updateStatus(data.indexOf(w), "Rejected")}
                      >
                        Reject
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
