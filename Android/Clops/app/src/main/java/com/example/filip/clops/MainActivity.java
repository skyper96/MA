package com.example.filip.clops;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.EditText;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.highlight.Highlight;
import com.github.mikephil.charting.listener.OnChartValueSelectedListener;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView listView;
    private List<Shop> shopList;
    private String OfflinePersistFileName = "OfflinePersist.txt";
    private File file;
    private View tempView;
    private Shop tempShop;
    private float[] yData;
    private String[] xData;
    private PieChart pieChart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        try {
            InitializeOfflinePersistFile();
            LoadOffline();
        } catch (IOException e) {
            AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
            alertDialog.setTitle("Alert");
            alertDialog.setMessage(e.getMessage() + "\n\n" + e.getStackTrace());
            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
            alertDialog.show();
        }
    }

    public void InitializeOfflinePersistFile() throws IOException {
        String baseFolder = getFilesDir().getAbsolutePath();
        file = new File(baseFolder + File.separator + OfflinePersistFileName);
        if (!file.exists()){
            new File(file.getParent()).mkdirs();
            file.createNewFile();
        }
    }

    public void SaveOffline() throws IOException {
        FileOutputStream fos = openFileOutput(OfflinePersistFileName, MODE_PRIVATE);

        for (Shop shop : shopList) {
            fos.write(shop.getName().getBytes());
            fos.write('|');
            fos.write(shop.getAddress().getBytes());
            fos.write('|');
            fos.write(shop.getEmail().getBytes());
            fos.write('|');
            fos.write(shop.getNetIncome().getBytes());
            fos.write('\n');
        }
        fos.close();
    }

    public void LoadOffline() throws IOException {
        shopList = new ArrayList<Shop>();
        FileInputStream fis = new FileInputStream(file.getAbsolutePath());

        byte[] data = new byte[(int) file.length()];
        fis.read(data);
        fis.close();

        String dataString = new String(data);

        String[] dataList = dataString.split("\n");

        for (String shopString : dataList) {
            String[] currentData = shopString.split("\\|");
            if (currentData.length > 0) {
                Shop shop = new Shop();
                shop.setName(currentData[0]);
                shop.setAddress(currentData[1]);
                shop.setEmail(currentData[2]);
                shop.setNetIncome(currentData[3]);
                shopList.add(shop);
            }
        }
    }

    public void btnLoginOnClick (View v){
        setContentView(R.layout.activity_home);

        listView = (ListView) findViewById(R.id.listView);

        ArrayAdapter<Shop> arrayAdapter = new ArrayAdapter<Shop>(
                this,
                android.R.layout.simple_list_item_1,
                shopList );

        listView.setAdapter(arrayAdapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l){
                String currentItem = listView.getItemAtPosition(i).toString();

                setContentView(R.layout.activity_manage);

                String[] entities = currentItem.split("\n");

                EditText shopName = (EditText) findViewById(R.id.editTextShopName);
                EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddress);
                EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmail);
                EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncome);

                shopName.setText(entities[0]);
                shopName.setEnabled(false);
                shopAddress.setText(entities[1]);
                shopEmail.setText(entities[2]);
                shopNetIncome.setText(entities[3]);

                pieChart = (PieChart) findViewById(R.id.idPieChart);

                float sum = 0;
                for (Shop shop : shopList) {
                    sum += Float.parseFloat(shop.getNetIncome().replaceAll("\\D+",""));
                }

                sum -= Float.parseFloat(shopNetIncome.getText().toString().replaceAll("\\D+",""));
                yData = new float[]{Float.parseFloat(shopNetIncome.getText().toString().replaceAll("\\D+", "")), sum};
                xData = new String[]{shopName.getText().toString(), "Other shops"};

                pieChart.setRotationEnabled(true);
                pieChart.setHoleRadius(25f);
                pieChart.setTransparentCircleAlpha(0);
                pieChart.setCenterText("Income Chart");
                pieChart.setCenterTextSize(10);
                pieChart.setDrawEntryLabels(true);

                addDataSet();

            }
        });
    }

    private void addDataSet(){
        ArrayList<PieEntry> yEntries = new ArrayList<>();
        ArrayList<String> xEntries = new ArrayList<>();

        for(int i = 0; i < yData.length; i++){
            yEntries.add(new PieEntry(yData[i], xData[i]));
        }

        PieDataSet pieDataSet = new PieDataSet(yEntries, "Net Income");
        pieDataSet.setSliceSpace(2);
        pieDataSet.setValueTextSize(12);

        ArrayList<Integer> colors = new ArrayList<>();
        colors.add(Color.RED);
        colors.add(Color.BLUE);

        pieDataSet.setColors(colors);

        Legend legend = pieChart.getLegend();
        legend.setForm(Legend.LegendForm.CIRCLE);
        legend.setPosition(Legend.LegendPosition.LEFT_OF_CHART);

        PieData pieData = new PieData(pieDataSet);
        pieChart.setData(pieData);
        pieChart.invalidate();
    }

    public void btnAddShopOnClick (View v){
        setContentView(R.layout.activity_addshop);
    }

    public void btnAddOnClick (View v){
        EditText shopName = (EditText) findViewById(R.id.editTextShopNameAdd);
        EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddressAdd);
        EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmailAdd);
        EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncomeAdd);

        Boolean found = false;
        for (Shop shop : shopList) {
            if(shop.getName().equals(shopName.getText().toString())){
                found = true;
            }
        }

        if (found){
            AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
            alertDialog.setTitle("Shop already exists");
            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
            alertDialog.show();
        }
        else{
            Shop current = new Shop();
            current.setName(shopName.getText().toString());
            current.setAddress(shopAddress.getText().toString());
            current.setEmail(shopEmail.getText().toString());
            current.setNetIncome(shopNetIncome.getText().toString());
            shopList.add(current);

            try {
                SaveOffline();
                btnLoginOnClick(v);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void btnEditOnClick (View v) throws IOException {
        EditText shopName = (EditText) findViewById(R.id.editTextShopName);
        EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddress);
        EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmail);
        EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncome);

        for (Shop shop : shopList) {
            if(shop.getName().equals(shopName.getText().toString())){
                shop.setAddress(shopAddress.getText().toString());
                shop.setEmail(shopEmail.getText().toString());
                shop.setNetIncome(shopNetIncome.getText().toString());
            }
        }

        SaveOffline();

        btnLoginOnClick(v);
    }

    public void btnDeleteOnClick (View v) throws IOException {
        tempView = v;
        EditText shopName = (EditText) findViewById(R.id.editTextShopName);
        for (Shop shop : shopList) {
            if(shop.getName().equals(shopName.getText().toString())){
                tempShop = shop;
                AlertDialog.Builder dialog = new AlertDialog.Builder(MainActivity.this);
                dialog.setTitle( "Do you really want to delete?" )
                        .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialoginterface, int i) {
                                try {
                                    shopList.remove(tempShop);
                                    SaveOffline();
                                    btnLoginOnClick(tempView);
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }).show();
            }
        }
    }

    private void initializeList(){
        shopList = new ArrayList<Shop>();
        Shop shop1 = new Shop();
        shop1.setName("Auchan");
        shop1.setAddress("Alexandru Vaida Voevod nr.53");
        shop1.setEmail("auchan@auchan.com");
        shop1.setNetIncome("154m");

        Shop shop2 = new Shop();
        shop2.setName("Profi");
        shop2.setAddress("Decebal nr.21");
        shop2.setEmail("cluj@profi.ro");
        shop2.setNetIncome("70m");

        shopList.add(shop1);
        shopList.add(shop2);
    }
}
